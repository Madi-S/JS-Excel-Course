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