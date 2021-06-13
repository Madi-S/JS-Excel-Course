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