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

export function changeStyles(data) {
    return {
        type: types.CHANGE_STYLES,
        data
    }
}

// data ~ value, ids
export function applyStyle(data) {
    return {
        type: types.APPLY_STYLE,
        data
    }
}

export function changeTableName(data) {
    return {
        type: types.CHANGE_TABLE_NAME,
        data
    }
}