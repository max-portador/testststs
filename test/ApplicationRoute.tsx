import React, {ComponentProps, FC} from 'react';
import {WrapperRoute} from "./WrapperRoute";
import {Application} from "../src/client/Application";
import {WrapperStore} from "./WrapperStor";

const ApplicationRoute: FC<ComponentProps<any>> = ({path}) => {
    return (
        <WrapperStore>
            <WrapperRoute path={path}>
                <Application />
            </WrapperRoute>
        </WrapperStore>
    );
}

export {ApplicationRoute};