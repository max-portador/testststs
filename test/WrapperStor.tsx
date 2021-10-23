import React, {FC} from 'react';
import {MockApi} from './MockApi';
import {CartApi} from '../src/client/api';
import {initStore} from '../src/client/store';
import {Provider} from 'react-redux';

const WrapperStore: FC = ({children}) => {
    const mockApi = new MockApi('/');
    const cart = new CartApi();
    const store = initStore(mockApi, cart);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export {WrapperStore};