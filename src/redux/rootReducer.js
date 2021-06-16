import * as types from '@/redux/types'
import {toInlineStyles} from '@core/utils'

// Pure function with no side effect (i.e. storing in localStorage)
export function rootReducer(state, action) {
    let field
    let stateName

    switch(action.type) {
        case types.COL_RESIZE:
            stateName = 'colState'
            field = getStateField(action, state, stateName)
            return {...state, field}


        case types.ROW_RESIZE:
            stateName = 'rowState'
            field = getStateField(action, state, stateName)
            return {...state, field}

        case types.CHANGE_TEXT:
            stateName = 'dataState'
            field = getStateField(action, state, stateName)
            return {...state, currentText: action.data.value, [stateName]: field}

        case types.CHANGE_STYLES:
            stateName = 'currentStyles'
            return {...state, [stateName]: action.data}

        case types.APPLY_STYLE:
            stateName = 'stylesState'
            field = state[stateName] || {}
            action.data.ids.forEach(id =>{
                field[id] = {...field[id], ...action.data.value}
            })
            return {
                ...state,
                [stateName]: field,
                currentStyles: {...state.currentStyles, ...action.value}
            }

        default: return state
    }
}


function getStateField(action, state, stateName) {
    const field = state[stateName] || {}
    field[action.data.id] = action.data.value
    return field
}