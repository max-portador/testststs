/**
 * @jest-environment jsdom
 */

import {expect, it} from '@jest/globals';
import {render, RenderResult} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {WrapperStore} from "../../../../WrapperStor";
import React from "react";
import {Catalog} from "../../../../../src/client/pages/Catalog";
import {BrowserRouter} from "react-router-dom";
import {MockApi} from "../../../../MockApi";

const renderCatalog = (): RenderResult => {
    return render(
        <WrapperStore>
            <BrowserRouter>
                <Catalog />
            </BrowserRouter>
        </WrapperStore>
    );
}

it('в каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    const mockApi = new MockApi('/');
    const products = await mockApi.getProducts();
    const productsId = products?.data?.map((product) => product.id);

    await renderCatalog();
    productsId.forEach((id) => screen.getAllByTestId(id));
});