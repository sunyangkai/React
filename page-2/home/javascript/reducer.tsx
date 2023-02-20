
export const JAVASCRIPT_INCREMENT = 'JAVASCRIPT_INCREMENT';

type JavaScriptState = {
    num: number;
}

const initData = {
    num: 0,
}

const javascript = (state: JavaScriptState = initData, action ) => {
    switch (action.type) {
        case JAVASCRIPT_INCREMENT:
            return {num: state.num + action.count}
        default:
            return state
    }
}

export { javascript }