/**
 * @jest-environment jsdom
 */

import {render, RenderResult, within} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {MockStore} from "../../../../MockStore";
import React from "react";
import {Catalog} from "../../../../../src/client/pages/Catalog";
import {BrowserRouter} from "react-router-dom";
import {MockApi} from "../../../../MockApi";
import {getMockCart} from "../../../../stubs";
import {CartApi} from "../../../../../src/client/api";
import {TestApp} from "../../../../TestApp";
import events from "@testing-library/user-event";

const renderCatalog = (): RenderResult => {
    return render(
        <MockStore>
            <BrowserRouter>
                <Catalog />
            </BrowserRouter>
        </MockStore>
    );
}

describe('На странице каталога', () => {
    it('должны отображаться товары, список которых приходит с сервера', async () => {
        const mockApi = new MockApi('/');
        const products = await mockApi.getProducts();
        const productsId = products?.data?.map((product) => product.id);

        await renderCatalog();
        productsId.forEach((id) => screen.getAllByTestId(id));
    });

    it('для каждого товара отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const mockApi = new MockApi('/');
        const products = await mockApi.getProducts();
        await renderCatalog();

        products.data.forEach((product) => {
            const elProduct = screen.getAllByTestId(product.id)?.[0];
            within(elProduct).getByRole('heading', {name: product.name, level: 5});
            within(elProduct).getByText(`$${product.price}`);
            within(elProduct).getByRole('link', {name: /Details/i});
        });
    });

    it('ссылка ведет на страницу с подробной информацией о товаре', async () => {
        const mockApi = new MockApi('/');
        const products = await mockApi.getProducts();
        const product = products.data[0];

        await render(<TestApp path={`/catalog`} />);

        const elProduct = screen.getAllByTestId(product.id)?.[0];
        const link = within(elProduct).getByRole('link', {name: /Details/i});

        await events.click(link);
        screen.getByRole('heading', {name: product.name, level: 1});
    });

    it('у товара, добавленного в корзину, отображается сообщение о наличии его в корзине', async () => {
        const productId = 0;
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        await renderCatalog();

        const elProduct = screen.getAllByTestId(productId)?.[0];

        within(elProduct).getByText(/Item in cart/i);
        cart.setState({});
    });
});