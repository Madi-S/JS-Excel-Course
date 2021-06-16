import {getFromLocalStorage} from '@core/utils'
import {DEFAULT_STYLES, STATE_KEY} from '@/constants'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {}, // {'4:10': 'someText'}
    stylesState: {}, // {'1': someStyles}
    currentText: '',
    currentStyles: DEFAULT_STYLES
}

function normalize(state) {
    return {
        ...state,
        currentText: '',
        currentStyles: DEFAULT_STYLES
    }
}

export const initialState = normalize(getFromLocalStorage(STATE_KEY)) || defaultState