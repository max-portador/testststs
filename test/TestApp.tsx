// @ts-ignore
import React, {ComponentProps, FC} from 'react';
import {MockRoute} from "./MockRoute";
import {Application} from "../src/client/Application";
import {MockStore} from "./MockStore";

const TestApp: FC<ComponentProps<any>> = ({path}) => {
    return (
        <MockStore>
            <MockRoute path={path}>
                <Application />
            </MockRoute>
        </MockStore>
    );
}

export {TestApp};