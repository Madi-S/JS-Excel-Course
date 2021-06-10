const CODES = {
    A: 65,
    Z: 90
}


function createCell(content = '') {
    return `
    <div class="cell" contenteditable spellcheck="false">${content}</div>
    `
}

function createCol(code) {
    return `
    <div class="column">
        ${String.fromCharCode(code)}
        <div class="col-resize"></div>
    </div>
    `
}

function createRow(counter, colsCount) {
    const cols = []
    if (counter === 0) {
        counter = ''
        let code = CODES.A
        for (let i = 0; i <= colsCount; i++) {
            cols.push(createCol(code++))
        }
    } else {
        for (let i = 0; i <= colsCount; i++) {
            cols.push(createCell())
        } 
    }
    return `
    <div class="row">
        <div class="row-info">
            ${counter}
            <div ${counter ? 'class="row-resize"' : ''}></div>
        </div>
        <div class="row-data">${cols.join('')}</div>
    </div>
    `
}

export function createTable(rowsCount = 100, columnsCount) {
    const colsCount = columnsCount || CODES.Z - CODES.A
    const rows = []
    for (let i = 0; i <= rowsCount; i++) {
        const row = createRow(i, colsCount)
        rows.push(row)
    }
    return rows.join('')
}

window.t = createTable