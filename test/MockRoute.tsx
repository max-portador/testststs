// @ts-ignore
import React, {FC, PropsWithChildren} from 'react';
import {createMemoryHistory} from "history";
import {Router} from "react-router";

const MockRoute: FC<PropsWithChildren<any>> = ({path, children}) => {
    const history = createMemoryHistory({
        initialEntries: [path],
        initialIndex: 0,
    });

    return (
        <Router history={history}>
            {children}
        </Router>
    );
}

export {MockRoute};