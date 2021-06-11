const CODES = {
    A: 65,
    Z: 90
}


function createCell(colId, rowId, content = '') {
    return `
    <div class="cell" data-type="cell" data-id=${colId + ':' + rowId} data-row-id=${rowId} data-col-id=${colId} contenteditable spellcheck="false">${content}</div>
    `
}

function createCol(code) {
    const colId = code - CODES.A
    return `
    <div class="column">
        ${String.fromCharCode(code)}
        <div data-resize="col" data-col-id=${colId} class="col-resize"></div>
    </div>
    `
}

function createRow(counter, colsCount) {
    const cols = []
    if (counter === -1) {
        counter = ''
        let code = CODES.A
        for (let i = 0; i <= colsCount; i++) {
            cols.push(createCol(code++))
        }
    } else {
        for (let i = 0; i <= colsCount; i++) {
            cols.push(createCell(i, counter))
        } 
    }
    const counterIsNum = typeof counter === 'number'
    return `
    <div class="row">
        <div class="row-info">
            ${counterIsNum ? counter + 1 : ''}
            <div ${counterIsNum ? 'data-resize="row" class="row-resize"' : ''}></div>
        </div>
        <div class="row-data">${cols.join('')}</div>
    </div>
    `
}

export function createTable(rowsCount = 100, columnsCount) {
    const colsCount = columnsCount || CODES.Z - CODES.A
    const rows = []
    for (let i = -1; i <= rowsCount; i++) {
        const row = createRow(i, colsCount)
        rows.push(row)
    }
    return rows.join('')
}