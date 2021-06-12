export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // Possible names for such method: `dispatch`, `fire` or `trigger`
    // Notifying subscribers (objects)
    // E.g., `table.emit('table:select', {a: 42})`
    // event is string
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach(listener => listener(...args))
            return true
        }
        return false
    }

    // Possible names for such method: `on`, `follow` or `listen`
    // Creating new subscriber
    // E.g., `obj.subscribe('table:select', () => {})`
    subscribe(event, func) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(func)
     
        // Unsubscribe function
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== func)
        }
    }
}




// DEBUG Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('formula:enter', (...data) => console.log('Data:', data))

// emitter.emit('formula:enter', 'A3', 'D9')
// emitter.emit('formula:focus', 'B1', 'E4')

// unsub()
// emitter.emit('formula:enter', 'G1', 'F2')