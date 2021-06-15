import {INIT} from '@/redux/types'


export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: INIT})
    let listeners = []
    
    return {
        subscribe(func) {
            listeners.push(func)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== func)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
        }
    }
}


// export class Reducer {

//     constructor(rootReducer, initialState = {}) {
//         this.state = rootReducer({...initialState}, {type: INIT})
//         this.listeners = []
            
//     }
//     subscribe(func) {
//         this.listeners.push(func)
//     }

//     dispatch(action) {
//         this.state = rootReducer(this.state, action)
//         this.listeners.forEach(listener => listener(this.state))
//     }

//     getState() {
//         return this.state
//     }

//     unsubscribe() {
//         this.listeners = this.listeners.filter(l => l !== func)
//     }
// }