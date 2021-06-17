import {DEFAULT_STYLES} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {}, // {'4:10': 'someText'}
    stylesState: {}, // {'1': someStyles}
    currentText: '',
    tableName: 'New Table',
    currentStyles: DEFAULT_STYLES,
}

export function normalzieInitialState(state) {
    return state ? state : clone(defaultState) 
}