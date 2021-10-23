import {CartState, CheckoutResponse, Product, ProductShortInfo} from '../src/common/types';

const getMockShortProduct = (id: number): ProductShortInfo => ({
    id,
    name: `Плюшка с ${id} кунжутами`,
    price: 100,
});

const getMockProduct = (id: number): Product => ({
    id,
    name: `Плюшка с ${id} кунжутами`,
    price: 100,
    description: 'Мало кунжутов не бывает',
    material: 'мякиш',
    color: 'горелый',
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
        name: 'Vitek',
        price: 100 * (id + 1),
        count: 1,
    }
})

export { getMockShortProduct, getMockProduct, getMockProducts, getMockCheckout, getMockCart };