export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function saveToLocalStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
}

export function getFromLocalStorage(key) {
    const item = localStorage.getItem(key)
    return JSON.parse(item)
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }

    return a === b
}

export function camelToDashCase(string) {
    let first = string[0]
    first = first.toUpperCase()
    string = first + string.slice(1, string.length)
    return capitalize(string).match(/[A-Z][a-z]+/g).join('-').toLowerCase()
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
    .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';')
}

export function debounce(func, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            func.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}