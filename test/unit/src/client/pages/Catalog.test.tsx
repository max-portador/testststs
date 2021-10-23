/**
 * @jest-environment jsdom
 */

import {render, RenderResult, within} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {WrapperStore} from "../../../../WrapperStor";
import React from "react";
import {Catalog} from "../../../../../src/client/pages/Catalog";
import {BrowserRouter} from "react-router-dom";
import {MockApi} from "../../../../MockApi";
import {getMockCart} from "../../../../stubs";
import {CartApi} from "../../../../../src/client/api";

const renderCatalog = (): RenderResult => {
    return render(
        <WrapperStore>
            <BrowserRouter>
                <Catalog />
            </BrowserRouter>
        </WrapperStore>
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
            within(elProduct).getByRole('heading', {name: product.name});
            within(elProduct).getByText(`$${product.price}`);
            within(elProduct).getByRole('link', {name: /Details/i});
        });
    });

    it('у товара, добавленного в корзину, отображается сообщение о наличии его в корзине', async () => {
        const productId = 0;
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        await renderCatalog();
        screen.getByText(/Item in cart/i);
        cart.setState({});
    });
});