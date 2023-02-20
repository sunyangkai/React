import { createStore, combineReducers } from "redux";
import { hooks } from "../home/hooks/reducer";
import { javascript } from '../home/javascript/reducer';



import { HookState } from '../home/hooks/reducer';

export interface State {
    hooks: HookState
}

// 全局你可以创建多个reducer 在这里统一在一起
const rootReducers = combineReducers({
    hooks,
    javascript
})
// 全局就管理一个store
export const store = createStore(rootReducers)