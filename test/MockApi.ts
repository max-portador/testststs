import {CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo} from "../src/common/types";
import {ExampleApi} from "../src/client/api";
import {getMockProduct, getMockProducts, getMockCheckout} from './stubs';
import {AxiosResponse} from "axios";

class MockApi extends ExampleApi {
    async getProducts() {
        return {data: getMockProducts(3)} as AxiosResponse<ProductShortInfo[]>;
    }

    async getProductById(id: number) {
        return {data: getMockProduct(id)} as AxiosResponse<Product>;
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        return {data: getMockCheckout(1)} as AxiosResponse<CheckoutResponse>;
    }
}

export { MockApi };