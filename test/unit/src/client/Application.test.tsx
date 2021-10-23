/**
 * @jest-environment jsdom
 */

import {render, RenderResult} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {WrapperStore} from "../../../WrapperStor";
import {Application} from "../../../../src/client/Application";
import React from "react";
import events from "@testing-library/user-event";
import {WrapperRoute} from "../../../WrapperRoute";

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
        screen.getByRole('heading', {name: /Catalog/i});
    });

    it('/delivery открывается страница "Delivery"', () => {
        renderRout('/delivery');
        screen.getByRole('heading', {name: /Delivery/i});
    });

    it('/contacts открывается страница "Contacts"', () => {
        renderRout('/contacts');
        screen.getByRole('heading', {name: /Contacts/i});
    });

    it('/cart открывается страница "Shopping cart"', () => {
        renderRout('/cart');
        screen.getByRole('heading', {name: /Shopping cart/i});
    });
});

describe('В шапке есть ссылки на', () => {
    it('главную страницу', async () => {
        const {container} = renderRout('/');
        const elLinkInHeader = !!container.querySelector('.navbar a.Application-Brand');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('catalog', () => {
        const {container} = renderRout('/');
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=catalog]');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('delivery', () => {
        const {container} = renderRout('/');
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=delivery]');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('contacts', () => {
        const {container} = renderRout('/');
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=contacts]');

        expect(elLinkInHeader).toBeTruthy();
    });

    it('cart', () => {
        const {container} = renderRout('/');
        const elLinkInHeader = !!container.querySelector('.navbar a.nav-link[href$=cart]');

        expect(elLinkInHeader).toBeTruthy();
    });
});

describe('Общие', () => {
    it('название магазина в шапке должно быть ссылкой на главную страницу', async () => {
        const {container} = renderRout('/delivery');

        await events.click(screen.getByRole('link', {name: /example store/i}));

        const issetElHome = !!container.querySelector('.Home');

        expect(issetElHome).toBeTruthy();
    });

    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
        const {container} = renderRout('/');

        await events.click(screen.getByRole('link', {name: /delivery/i}));

        const isClosedMobileMenu = !!container.querySelector('.navbar-collapse.collapse');

        expect(isClosedMobileMenu).toBeTruthy();
    });
});