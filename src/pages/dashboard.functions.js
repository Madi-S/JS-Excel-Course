function toHTML(key) {
    const tableKey = key.split(':')[1]
    const {tableName} = JSON.parse(localStorage.getItem(key))
    const date = new Date(+tableKey)
    return `
    <li class="db__record">
         <a href="#excel/${tableKey}">${tableName}</a>
         <strong>${date.toLocaleDateString() + ' | ' + date.toLocaleTimeString()}</strong>
     </li>`
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys) {
        return `<p>You have not created any tables yet</p>`
    }
    
    return `
            <div class="db__list-header">
                <span>Table name</span>
                <span>Created</span>
            </div>

            <ul class="db__list">
                ${keys.map(toHTML).join('')}
            </ul>`
}