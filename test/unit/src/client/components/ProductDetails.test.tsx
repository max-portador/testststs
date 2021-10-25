/**
 * @jest-environment jsdom
 */

import {render, RenderResult} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {CartApi} from "../../../../../src/client/api";
import {getMockCart, getMockProduct} from "../../../../stubs";
import {ProductDetails} from "../../../../../src/client/components/ProductDetails";
import {MockStore} from "../../../../MockStore";
import React from "react";
import {Product} from "../../../../../src/common/types";
import events from "@testing-library/user-event";

const renderProduct = (product: Product): RenderResult => {
    return render(
        <MockStore>
            <ProductDetails product={product} />
        </MockStore>
    );
};

describe('На странице товара', () => {
    it('отображается название', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const {container} = renderProduct(product);
        const value = container.querySelector('.ProductDetails-Name').innerHTML;

        expect(value).toBe(product.name);
    });

    it('отображается описание', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const {container} = renderProduct(product);
        const value = container.querySelector('.ProductDetails-Description').innerHTML;

        expect(value).toBe(product.description);
    });

    it('отображается цена', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const {container} = renderProduct(product);
        const value = container.querySelector('.ProductDetails-Price').innerHTML;

        expect(value).toBe(`$${product.price}`);
    });

    it('отображается цвет', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const {container} = renderProduct(product);
        const value = container.querySelector('.ProductDetails-Color').innerHTML;

        expect(value).toBe(product.color);
    });

    it('отображается материал', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const {container} = renderProduct(product);
        const value = container.querySelector('.ProductDetails-Material').innerHTML;

        expect(value).toBe(product.material);
    });

    it('отображается кнопка добавления в корзину', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const {container} = renderProduct(product);
        const issetButton = !!container.querySelector('.ProductDetails-AddToCart');

        expect(issetButton).toBeTruthy();
    });

    it('добавляется в корзину', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        renderProduct(product);

        const cartState = cart.getState();

        expect(cartState).toHaveProperty(productId.toString());
        cart.setState({});
    });

    it('отображается сообщение о наличии товара в корзине, если он добавлен в корзину', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        renderProduct(product);
        screen.getByText(/Item in cart/i);
        cart.setState({});
    });

    it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество в корзине', async () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const cart = new CartApi();

        renderProduct(product);

        const buttonSubmit = screen.getByRole('button', {name: /Add to Cart/i});

        await events.click(buttonSubmit);

        let countCurProductInCart = cart.getState()?.[productId]?.count;

        expect(countCurProductInCart).toBe(1);
        await events.click(buttonSubmit);
        countCurProductInCart = cart.getState()?.[productId]?.count;
        expect(countCurProductInCart).toBe(2);
        cart.setState({});
    });
});