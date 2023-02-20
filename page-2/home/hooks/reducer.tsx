
export const SET_LIST = 'SETLIST';
export const SET_TITLE = 'SET_TITLE';

interface item {
    id: number;
    title: string;
}
export type HookState = {
    num: number;
    title: string;
    list: item[];
}

const initData = {
    num: 0,
    title: '默认',
    list: []
}

const hooks = (state: HookState = initData, action ) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.list
            }
        case SET_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export { hooks }