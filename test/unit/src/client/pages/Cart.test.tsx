/**
 * @jest-environment jsdom
 */

import {render, RenderResult, within} from "@testing-library/react";
import events from "@testing-library/user-event";
import {screen} from "@testing-library/dom";
import {CartApi} from "../../../../../src/client/api";
import {getMockCart} from "../../../../stubs";
import {WrapperStore} from "../../../../WrapperStor";
import {Cart} from "../../../../../src/client/pages/Cart";
import React, {FC} from "react";
import {BrowserRouter} from "react-router-dom";
import {CartItem} from "../../../../../src/common/types";
import {ApplicationRoute} from "../../../../ApplicationRoute";

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

const renderFilledCart = (productId: number): RenderResult => {
    const cart = new CartApi();

    cart.setState(getMockCart(productId));

    const resultRender = render(<CartWrapper />);

    cart.setState({});

    return resultRender;
}

describe('Корзина', () => {
    it('изначально пуста', () => {
        const {container} = render(<CartWrapper />);
        const countItemCart = getCountItemCart(container);

        expect(countItemCart).toBe(0);
    });

    it('отображается ссылка на каталог, если корзина пуста', async () => {
        render(<ApplicationRoute path="/cart" />);

        const catalogLinks = screen.getAllByRole('link', {name: /catalog/i});
        const catalogLink = catalogLinks[catalogLinks.length - 1];

        await events.click(catalogLink);
        screen.getByRole('heading', {name: /Catalog/i});
    });

    it('наполняется товарами', () => {
        const productId = 0;
        // const {container} = renderFilledCart(productId);
        // const countItemCart = getCountItemCart(container);
        //
        // expect(countItemCart).toBeGreaterThan(0);
        renderFilledCart(productId);
        screen.getByTestId(0);
    });

    it('отображается верная общая сумма заказа', () => {
        const cart = new CartApi();
        const itemsCart = {...getMockCart(0), ...getMockCart(1)};
        const totalPrice = Object.values(itemsCart)
            .reduce((acc: number, itemCart: CartItem) =>  acc + (itemCart.price * itemCart.count), 0);

        cart.setState(itemsCart);
        render(<CartWrapper />);
        screen.getByText(`$${totalPrice}`);
        cart.setState({});
    });

    it('очищается', async () => {
        const cart = new CartApi();
        const productId = 0;
        const {container} = renderFilledCart(productId);
        const buttonSubmit = screen.getByRole('button', {name: /Clear shopping cart/});

        await events.click(buttonSubmit);

        const countItemCart = getCountItemCart(container);

        expect(countItemCart).toBe(0);
        cart.setState({});
    });
});

describe('Заказ', () => {
    it('есть возможность оформления', async () => {
        const productId = 0;
        const {container} = renderFilledCart(productId);
        const issetForm = !!container.querySelector('.Form');

        expect(issetForm).toBeTruthy();
    });

    it('с пустой формой не сабмитится', async () => {
        const cart = new CartApi();
        const productId = 0;
        const {container} = renderFilledCart(productId);
        const buttonSubmit = screen.getByRole('button', {name: /Checkout/i});

        await events.click(buttonSubmit);

        const issetNoValidInput = !!container.querySelector('.Form .Form-Field.is-invalid');

        expect(issetNoValidInput).toBeTruthy();
        cart.setState({});
    });

    it('оформляется', async () => {
        const cart = new CartApi();
        const productId = 0;
        const {container} = renderFilledCart(productId);
        const inputName = screen.getByRole('textbox', {name: /name/i});
        const inputPhone = screen.getByRole('textbox', {name: /phone/i});
        const inputAddress = screen.getByRole('textbox', {name: /address/i});
        const buttonSubmit = screen.getByRole('button', {name: /Checkout/i});

        events.type(inputName, 'Test Name');
        events.type(inputPhone, '1111111111');
        events.type(inputAddress, 'Test Address');
        await events.click(buttonSubmit);

        const issetSuccessMessage = !!container.querySelector('.Cart-SuccessMessage');

        expect(issetSuccessMessage).toBeTruthy();
        cart.setState({});
    });
});

describe('В корзине у каждого товара в таблице отображается верное', () => {
    it('название', async () => {
        const productId = 0;
        const cart = new CartApi();
        const dataCart = getMockCart(productId);
        const product = dataCart[productId];

        cart.setState(dataCart);
        render(<CartWrapper />);

        const elItemCart = screen.getByTestId(productId);
        const valueOnCell = elItemCart.querySelector('.Cart-Name').innerHTML;

        expect(valueOnCell).toBe(product.name);
        cart.setState({});
    });

    it('цена', async () => {
        const productId = 0;
        const cart = new CartApi();
        const dataCart = getMockCart(productId);
        const product = dataCart[productId];

        cart.setState(dataCart);
        render(<CartWrapper />);

        const elItemCart = screen.getByTestId(productId);
        const valueOnCell = elItemCart.querySelector('.Cart-Price').innerHTML;

        expect(valueOnCell).toBe(`$${product.price}`);
        cart.setState({});
    });

    it('количество', async () => {
        const productId = 0;
        const cart = new CartApi();
        const dataCart = getMockCart(productId);
        const product = dataCart[productId];

        cart.setState(dataCart);
        render(<CartWrapper />);

        const elItemCart = screen.getByTestId(productId);
        const valueOnCell = elItemCart.querySelector('.Cart-Count').innerHTML;

        expect(valueOnCell).toBe(product.count.toString());
        cart.setState({});
    });

    it('общая стоимость', async () => {
        const productId = 0;
        const cart = new CartApi();
        const dataCart = getMockCart(productId);
        const product = dataCart[productId];

        cart.setState(dataCart);
        render(<CartWrapper />);

        const elItemCart = screen.getByTestId(productId);
        const valueOnCell = elItemCart.querySelector('.Cart-Total').innerHTML;

        expect(valueOnCell).toBe(`$${product.price * product.count}`);
        cart.setState({});
    });
});