/**
 * @jest-environment jsdom
 */

import {it, expect, describe} from '@jest/globals';
import {render, RenderResult} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {CartApi} from "../../../../../src/client/api";
import {getMockCart, getMockProduct} from "../../../../stubs";
import {ProductDetails} from "../../../../../src/client/components/ProductDetails";
import {WrapperStore} from "../../../../WrapperStor";
import React from "react";
import {Product} from "../../../../../src/common/types";
import events from "@testing-library/user-event";

const renderProduct = (product: Product): RenderResult => {
    return render(
        <WrapperStore>
            <ProductDetails product={product} />
        </WrapperStore>
    );
};

describe('На странице товара', () => {
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

    it('отображается название', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByText(product.name);
    });

    it('отображается описание', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByText(product.description);
    });

    it('отображается цена', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByText(`$${product.price}`);
    });

    it('отображается описание', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByText(product.description);
    });

    it('отображается цвет', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByText(product.color);
    });

    it('отображается материал', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByText(product.material);
    });

    it('отображается описание', () => {
        const productId = 0;
        const product = getMockProduct(productId);

        renderProduct(product);
        screen.getByRole('button', { name: /Add to Cart/i });
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

        const buttonSubmit = screen.getByRole('button', { name: /Add to Cart/i });

        await events.click(buttonSubmit);

        let countCurProductInCart = cart.getState()?.[productId]?.count;

        expect(countCurProductInCart).toBe(1);
        await events.click(buttonSubmit);
        countCurProductInCart = cart.getState()?.[productId]?.count;
        expect(countCurProductInCart).toBe(2);
        cart.setState({});
    });
});