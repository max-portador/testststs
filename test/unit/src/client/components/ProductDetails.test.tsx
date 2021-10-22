/**
 * @jest-environment jsdom
 */

import {it, expect, describe} from '@jest/globals';
import {render} from "@testing-library/react";
import {CartApi} from "../../../../../src/client/api";
import {getMockCart, getMockProduct} from "../../../../stubs";
import {ProductDetails} from "../../../../../src/client/components/ProductDetails";
import {WrapperStore} from "../../../../WrapperStor";
import React from "react";

describe('Товар', () => {
    it('добавляется в корзину', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const cart = new CartApi();

        cart.setState(getMockCart(productId));

        render(
            <WrapperStore>
                <ProductDetails product={product} />
            </WrapperStore>
        );

        const cartState = cart.getState();

        expect(cartState).toHaveProperty(productId.toString());
    });
});