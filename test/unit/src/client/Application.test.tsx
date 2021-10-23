/**
 * @jest-environment jsdom
 */

import {render} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import React from "react";
import events from "@testing-library/user-event";
import {ApplicationRoute} from "../../../ApplicationRoute";

describe('По адресу', () => {
    it('/catalog открывается страница "Catalog"', () => {
        render(<ApplicationRoute path="/catalog" />);
        screen.getByRole('heading', {name: /Catalog/i, level: 1});
    });

    it('/delivery открывается страница "Delivery"', () => {
        render(<ApplicationRoute path="/delivery" />);
        screen.getByRole('heading', {name: /Delivery/i, level: 1});
    });

    it('/contacts открывается страница "Contacts"', () => {
        render(<ApplicationRoute path="/contacts" />);
        screen.getByRole('heading', {name: /Contacts/i, level: 1});
    });

    it('/cart открывается страница "Shopping cart"', () => {
        render(<ApplicationRoute path="/cart" />);
        screen.getByRole('heading', {name: /Shopping cart/i, level: 1});
    });
});

describe('В шапке есть ссылки на', () => {
    it('главную страницу', async () => {
        const {container} = render(<ApplicationRoute path="/" />);
        const elLinkInHeader = !!container.querySelector('.navbar a.Application-Brand');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('catalog', () => {
        const {container} = render(<ApplicationRoute path="/" />);
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=catalog]');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('delivery', () => {
        const {container} = render(<ApplicationRoute path="/" />);
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=delivery]');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('contacts', () => {
        const {container} = render(<ApplicationRoute path="/" />);
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=contacts]');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('cart', () => {
        const {container} = render(<ApplicationRoute path="/" />);
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=cart]');

        expect(elLinkInHeader).toBeTruthy();
    });
});

describe('Общие', () => {
    it('название магазина в шапке должно быть ссылкой на главную страницу', async () => {
        const {container} = render(<ApplicationRoute path="/delivery" />);

        await events.click(screen.getByRole('link', {name: /example store/i}));

        const issetElHome = !!container.querySelector('.Home');

        expect(issetElHome).toBeTruthy();
    });

    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
        const {container} = render(<ApplicationRoute path="/" />);

        await events.click(screen.getByRole('link', {name: /delivery/i}));

        const isClosedMobileMenu = !!container.querySelector('.navbar-collapse.collapse');

        expect(isClosedMobileMenu).toBeTruthy();
    });
});