import * as types from './types'

// Action creaters

export function rowResize(data) {
    return {
        type: types.ROW_RESIZE,
        data
    }
}

export function colResize(data) {
    return {
        type: types.COL_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: types.CHANGE_TEXT,
        data
    }
}