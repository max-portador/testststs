import React, {FC, PropsWithChildren} from 'react';
import {createMemoryHistory} from "history";
import {Router} from "react-router";

const WrapperRoute: FC<PropsWithChildren<any>> = ({path, children}) => {
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

export {WrapperRoute};