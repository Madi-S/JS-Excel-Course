const CODES = {
    A: 65,
    Z: 90
}


function createCell(id, content = '') {
    return `
    <div class="cell" data-cell-id=${id} contenteditable spellcheck="false">${content}</div>
    `
}

function createCol(code) {
    const id = code - CODES.A
    return `
    <div class="column">
        ${String.fromCharCode(code)}
        <div data-resize="col" data-cell-id=${id} class="col-resize"></div>
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
            cols.push(createCell(i))
        } 
    }
    return `
    <div class="row">
        <div class="row-info">
            ${counter}
            <div ${counter ? 'data-resize="row" class="row-resize"' : ''}></div>
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