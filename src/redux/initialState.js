import {getFromLocalStorage} from '@core/utils'
import {DEFAULT_STYLES, STATE_KEY} from '@/constants'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {}, // {'4:10': 'someText'}
    stylesState: {}, // {'1': someStyles}
    currentText: '',
    tableName: 'New Table',
    currentStyles: DEFAULT_STYLES,
}


export const initialState = getFromLocalStorage(STATE_KEY) || defaultState