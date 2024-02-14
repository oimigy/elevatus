import React, {useEffect, useState} from 'react';

type Actions = CustomObject<(globalState: CustomObject<any>, payload?: any) => CustomObject<any>>;
type Listener = React.Dispatch<CustomObject<any>>;
type Store = [CustomObject<any>, (actionIdentifier: string, payload?: any) => void, (actionIdentifier: string, payload?: any) => void];

let globalState: CustomObject<any> = {};
let listeners: Listener[] = [];
let actions: Actions = {};

const notifyListeners = (state: CustomObject<any>) => {
    for (const listener of listeners) {
        listener(state);
    }
}
const addListener = (listener: Listener) => {
    listeners.push(listener);
}
const removeListener = (listener: Listener) => {
    const index = listeners.findIndex(li => li === listener);
    index > -1 && listeners.splice(index, 1);
}

export const useStore = (shouldListen = true): Store => {
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier: string, payload?: any) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};
        notifyListeners(globalState);
    };

    const dispatchAsync = async (actionIdentifier: string, payload?: any) => {
        const [newState] = await Promise.all([actions[actionIdentifier](globalState, payload)]);
        globalState = {...globalState, ...newState};
        notifyListeners(globalState);
    };

    useEffect(() => {
        if (shouldListen) addListener(setState);

        return () => {
            if (shouldListen) removeListener(setState);
        };
    }, [shouldListen]);

    return [globalState, dispatch, dispatchAsync];
};

export const initStore = (userActions: Actions | null | undefined, initialState: CustomObject<any> | null | undefined, notify = false) => {
    if (userActions) actions = {...actions, ...userActions};
    if (initialState) {
        globalState = {...globalState, ...initialState};
        notify && notifyListeners(globalState);
    }
};
