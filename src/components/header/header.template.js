export function createHeader(state) {
    console.log(state, state.tableName)
    const tableName = state['tableName'] || 'New Table'
    return `
    <input 
        data-role="tableName" 
        type="text" 
        value="${tableName}" 
        class="input"
    />

    <div>
        <div data-type="button" data-role="delete" class="button">
            <span data-type="button" data-role="delete" class="material-icons">
                delete
            </span>
        </div>

        <div data-type="button" data-role="exit" class="button">
            <span data-type="button" data-role="exit" class="material-icons">
                exit_to_app
            </span>
        </div>
    </div>`
}