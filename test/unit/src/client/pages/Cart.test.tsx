/**
 * @jest-environment jsdom
 */

import {describe, expect, it} from '@jest/globals';
import {render, RenderResult} from "@testing-library/react";
import events from "@testing-library/user-event";
import {screen} from "@testing-library/dom";
import {CartApi} from "../../../../../src/client/api";
import {getMockCart} from "../../../../stubs";
import {WrapperStore} from "../../../WrapperWithStor";
import {Cart} from "../../../../../src/client/pages/Cart";
import React, {FC} from "react";
import {BrowserRouter} from "react-router-dom";

const CartWrapper: FC = () => (
    <WrapperStore>
        <BrowserRouter>
            <Cart />
        </BrowserRouter>
    </WrapperStore>
);

const getCountItemCart = (container: HTMLElement): number => {
    const elIndexCellOnCartTable = container.querySelectorAll('.Cart-Table .Cart-Index');

    return Array.from(elIndexCellOnCartTable).length;
}

const renderFilledCart = (): RenderResult => {
    const productId = 0;
    const cart = new CartApi();

    cart.setState(getMockCart(productId));
    return render(<CartWrapper />);
}

describe('Корзина', () => {
    it('изначально пуста', () => {
        const {container} = render(<CartWrapper />);
        const countItemCart = getCountItemCart(container);

        expect(countItemCart).toBe(0);
    });

    it('наполняется товарами', () => {
        // const {container} = renderFilledCart();
        // const countItemCart = getCountItemCart(container);
        //
        // expect(countItemCart).toBeGreaterThan(0);
        renderFilledCart();
        screen.getByTestId(0);
    });

    it('очищается', async () => {
        const {container} = renderFilledCart();
        const buttonSubmit = screen.getByRole('button', { name: /Clear shopping cart/i });

        await events.click(buttonSubmit);

        const countItemCart = getCountItemCart(container);

        expect(countItemCart).toBe(0);
    });
});

describe('Заказ', () => {
    it('есть возможность оформления', async () => {
        const {container} = renderFilledCart();
        const issetForm = !!container.querySelector('.Form');

        expect(issetForm).toBeTruthy();
    });

    it('с пустой формой не сабмитится', async () => {
        const {container} = renderFilledCart();
        const buttonSubmit = screen.getByRole('button', { name: /Checkout/i });

        await events.click(buttonSubmit);

        const issetNoValidInput = !!container.querySelector('.Form .Form-Field.is-invalid');

        expect(issetNoValidInput).toBeTruthy();
    });

    it('оформляется', async () => {
        const {container} = renderFilledCart();
        const inputName = screen.getByRole('textbox', { name: /name/i });
        const inputPhone = screen.getByRole('textbox', { name: /phone/i });
        const inputAddress = screen.getByRole('textbox', { name: /address/i });
        const buttonSubmit = screen.getByRole('button', { name: /Checkout/i });

        events.type(inputName, 'Test Name');
        events.type(inputPhone, '1111111111');
        events.type(inputAddress, 'Test Address');
        await events.click(buttonSubmit);

        const issetSuccessMessage = !!container.querySelector('.Cart-SuccessMessage');

        expect(issetSuccessMessage).toBeTruthy();
    });
});