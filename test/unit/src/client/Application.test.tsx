/**
 * @jest-environment jsdom
 */

import {describe, it} from '@jest/globals';
import {render, RenderResult} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {WrapperStore} from "../../WrapperWithStor";
import {Application} from "../../../../src/client/Application";
import React from "react";
import {Router} from "react-router";
import {createMemoryHistory} from 'history';

const renderRout = (path: string): RenderResult => {
    const history = createMemoryHistory({
        initialEntries: [path],
        initialIndex: 0,
    });

    return render(
        <WrapperStore>
            <Router history={history}>
                <Application />
            </Router>
        </WrapperStore>
    );
}

describe('По адресу', () => {
    it('/catalog открывается страница "Catalog"', () => {
        renderRout('/catalog');
        screen.getByRole('heading', { name: /Catalog/i })
    });

    it('/delivery открывается страница "Delivery"', () => {
        renderRout('/delivery');
        screen.getByRole('heading', { name: /Delivery/i })
    });

    it('/contacts открывается страница "Contacts"', () => {
        renderRout('/contacts');
        screen.getByRole('heading', { name: /Contacts/i })
    });

    it('/cart открывается страница "Shopping cart"', () => {
        renderRout('/cart');
        screen.getByRole('heading', { name: /Shopping cart/i })
    });
});