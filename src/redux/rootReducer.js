import * as types from '@/redux/types'

// Pure function with no side effect (i.e. storing in localStorage)
export function rootReducer(state, action) {
    // console.log('Action:', action)
    let prevState
    switch(action.type) {
        case types.COL_RESIZE:
            const colState = state.colState || {}
            colState[action.data.id] = action.data.value // column id, px value
            return {...state, colState}

        case types.ROW_RESIZE:
            const rowState = state.rowState || {}
            rowState[action.data.id] = action.data.value // row id, px value
            return {...state, rowState}

        case types.CHANGE_TEXT:
            prevState = state['dataState'] || {}
            prevState[action.data.id] = action.data.value
            return {...state, currentText: action.data.value, dataState: prevState}

        default: return state
    }
}