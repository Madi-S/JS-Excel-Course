const CODES = {
    A: 65,
    Z: 90
}

let colState
let rowState
let dataState

function createCell(colId, rowId) {
    const width = colState[colId] 
    const css = `style="width: ${width};"`
    const content = dataState[`${colId}:${rowId}`] || ''

    return `
    <div ${css} class="cell" data-type="cell" data-id=${colId + ':' + rowId} data-row-id=${rowId} data-col-id=${colId} contenteditable spellcheck="false">${content}</div>
    `
}

function createCol(code) {
    const colId = code - CODES.A
    const width = colState[colId] 
    const css = `style="width: ${width};"`

    return `
    <div ${css} class="column" data-role="selectCol" data-col-id=${colId}>
        ${String.fromCharCode(code)}
        <div data-resize="col" data-col-id=${colId} class="col-resize"></div>
    </div>
    `
}

function createRow(rowsCounter, colsCount) {
    const cols = []
    
    if (rowsCounter === -1) {
        let code = CODES.A
        rowsCounter = ''
        
        for (let i = 0; i <= colsCount; i++) {
            cols.push(createCol(code++))
        }
    } else {
        
        for (let i = 0; i <= colsCount; i++) {
            const content = ''
            cols.push(createCell(i, rowsCounter, content, ''))
        } 
    }

    if (typeof rowsCounter === 'number') {
        const height = rowState[rowsCounter]
        const css = height ? `style="height: ${height};"` : ''

        return `
        <div ${css} class="row">
            <div class="row-info" data-role="selectRow" data-row-id=${rowsCounter}>
                ${rowsCounter + 1}
                <div data-resize="row" class="row-resize"></div>
            </div>
            <div class="row-data">${cols.join('')}</div>
        </div>
        `
    }
    return `
        <div class="row">
            <div class="row-info row-info-disabled">                
                <div class="row-resize"></div>
            </div>
            <div class="row-data">${cols.join('')}</div>
        </div>
        `
    
}

export function createTable(rowsCount = 100, columnsCount = 20, state = {}) {
    colState = state['colState']
    rowState = state['rowState']
    dataState = state['dataState']

    const colsCount = columnsCount || CODES.Z - CODES.A
    const rows = []

    for (let rowId = -1; rowId < rowsCount; rowId++) {
        const row = createRow(rowId, colsCount)
        rows.push(row)
    }

    return rows.join('')
}