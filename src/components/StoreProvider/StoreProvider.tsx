import {initStore} from "../../hooks/use-store";

const StoreProvider = (props: { children: any; }) => {


    const state = {
        data: {
            jobs: [],
            limit: 0,
            page: 0,
            total: 0,
            pages: 0,
        },
        currentPage: 1,
        query: "",
    }
    const actions = {
        "SET_DATA": (globalState: any, payload: any) => {
            return {...globalState, data: payload};
        },
        "SET_PAGE": (globalState: any, payload: any) => {
            payload && localStorage.setItem("currentPage", payload);
            return {...globalState, currentPage: payload};
        },
        "SET_QUERY": (globalState: any, payload: any) => {
            payload && localStorage.setItem("query", payload);
            return {...globalState, query: payload};
        },
    }
    initStore(actions, state);
    return props.children;
}

export default StoreProvider;