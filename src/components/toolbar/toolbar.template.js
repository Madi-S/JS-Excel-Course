function createButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'`
    return `<div 
                ${meta}
                class="button ${button.active ? 'active': ''}"
            >
                <span
                ${meta}
                class="material-icons"
            >${button.icon}</span>
            </div>`
}

export function createToolbar() {
    const buttons = [{
            icon: 'format_align_left',
            active: false,
            value: {
                textAlign: 'left'
            }
        },
        {
            icon: 'format_align_center',
            active: false,
            value: {
                textAlign: 'center'
            }
        },
        {
            icon: 'format_align_right',
            active: false,
            value: {
                textAlign: 'right'
            }
        },
        {
            icon: 'format_bold',
            active: false,
            value: {
                fontWeight: 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: false,
            value: {
                fontStyle: 'italic'
            }
        },
        {
            icon: 'format_underlined',
            active: false,
            value: {
                textDecoration: 'underline'
            }
        },
    ]
    return buttons.map(createButton).join('')
}