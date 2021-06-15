import {COL_RESIZE, ROW_RESIZE, INIT} from '@/redux/types'

// Pure function with no side effect (i.e. storing in localStorage)
export function rootReducer(state, action) {
    switch(action.type) {
        case COL_RESIZE:
            const colState = state.colState || {}
            colState[action.data.id] = action.data.value // column id, px value
            return {...state, colState}
        case ROW_RESIZE:
            const rowState = state.rowState || {}
            rowState[action.data.id] = action.data.value // row id, px value
            return {...state, rowState}
        case INIT:
            void(0)

        default: return state
    }
}