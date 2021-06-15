import {getFromLocalStorage} from '@core/utils'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {}, // {'4:10': 'someText'}
    currentText: ''
}
export const STATE_KEY = 'excel-state'

export const initialState = getFromLocalStorage(STATE_KEY) || defaultState