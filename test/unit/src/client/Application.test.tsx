/**
 * @jest-environment jsdom
 */

import {describe, expect, it} from '@jest/globals';
import {render, RenderResult} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {WrapperStore} from "../../../WrapperStor";
import {Application} from "../../../../src/client/Application";
import React from "react";
import events from "@testing-library/user-event";
import {WrapperRoute} from "../../../WrapperRoute";
import {CartApi} from "../../../../src/client/api";

const renderRout = (path: string): RenderResult => {
    return render(
        <WrapperStore>
            <WrapperRoute path={path}>
                <Application />
            </WrapperRoute>
        </WrapperStore>
    );
}

describe('По адресу', () => {
    it('/catalog открывается страница "Catalog"', () => {
        renderRout('/catalog');
        screen.getByRole('heading', { name: /Catalog/i });
    });

    it('/delivery открывается страница "Delivery"', () => {
        renderRout('/delivery');
        screen.getByRole('heading', { name: /Delivery/i });
    });

    it('/contacts открывается страница "Contacts"', () => {
        renderRout('/contacts');
        screen.getByRole('heading', { name: /Contacts/i });
    });

    it('/cart открывается страница "Shopping cart"', () => {
        renderRout('/cart');
        screen.getByRole('heading', { name: /Shopping cart/i });
    });
});

describe('В шапке есть ссылки на', () => {
    it('главную страницу', () => {
        renderRout('/');
        screen.getByRole('link', { name: /example store/i });
    });

    it('catalog', () => {
        renderRout('/');
        screen.getByRole('link', { name: /catalog/i });
    });

    it('delivery', () => {
        renderRout('/');
        screen.getByRole('link', { name: /delivery/i });
    });

    it('contacts', () => {
        renderRout('/');
        screen.getByRole('link', { name: /contacts/i });
    });

    it('cart', () => {
        renderRout('/');
        screen.getByRole('link', { name: /cart/i });
    });
});

describe('Общие', () => {
    it('Название магазина в шапке должно быть ссылкой на главную страницу', async () => {
        const {container} = renderRout('/delivery');

        await events.click(screen.getByRole('link', { name: /example store/i }));

        const issetElHome = !!container.querySelector('.Home');

        expect(issetElHome).toBeTruthy();
    });

    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
        const {container} = renderRout('/');

        await events.click(screen.getByRole('link', { name: /delivery/i }));

        const isClosedMobileMenu = !!container.querySelector('.navbar-collapse.collapse');

        expect(isClosedMobileMenu).toBeTruthy();
    });

    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
        const productId = 0;
        const cart = new CartApi();

        await renderRout(`/catalog/${productId}`);

        const buttonAddToCart = await screen.getByRole('button', { name: /Add to Cart/i });

        await events.dblClick(buttonAddToCart);
        screen.getByRole('link', {name: 'Cart (1)'});
        cart.setState({});
    });
});