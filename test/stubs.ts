import {CartState, CheckoutResponse, Product, ProductShortInfo} from '../src/common/types';

const getMockShortProduct = (id: number): ProductShortInfo => ({
    id,
    name: `Portal Gun, ${id} shots`,
    price: 300,
});

const getMockProduct = (id: number): Product => ({
    id,
    name: `Portal Gun, ${id} shots`,
    price: 100,
    description: 'Multiverse explorer',
    material: 'plastic',
    color: 'green',
});

const getMockProducts = (n: number): ProductShortInfo[] => {
    return Array(n)
        .fill('')
        .map((v: any, k: number) => getMockShortProduct(k));
    // return [];
}

const getMockCheckout = (n: number): CheckoutResponse => {
    return {id: n};
}

const getMockCart = (id: number): CartState => ({
    [id]: {
        name: 'Plumbus',
        price: 10 * (id + 1),
        count: 5,
    }
})

export { getMockShortProduct, getMockProduct, getMockProducts, getMockCheckout, getMockCart };