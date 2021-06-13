export function rootReducer(state, action) {
    switch(action.type) {
        case 'TABLE_RESIZE':
            const prevColState = state.colState || {}
            prevColState[action.data.id] =  action.data.value
            return {...state, colState: prevColState} // column id, px value
        default: return state
    }
}