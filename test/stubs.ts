import {CartState, CheckoutResponse, Product, ProductShortInfo} from '../src/common/types';

const getMockShortProduct = (id: number): ProductShortInfo => ({
    id,
    name: 'product',
    price: 1,
});

const getMockProduct = (id: number): Product => ({
    id,
    name: 'product',
    price: 1,
    description: 'description',
    material: 'material',
    color: 'color',
});

const getMockProducts = (n: number): ProductShortInfo[] => {
    return Array(n)
        .map((v: any, k: number) => getMockShortProduct(k));
}

const getMockCheckout = (n: number): CheckoutResponse => {
    return {id: n};
}

const getMockCart = (id: number): CartState => ({
    [id]: {
        name: 'Vitek',
        price: 100500,
        count: 200,
    }
})

export { getMockShortProduct, getMockProduct, getMockProducts, getMockCheckout, getMockCart };