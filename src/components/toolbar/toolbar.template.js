function createButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'`
    return `<div 
                class="button ${button.active ? 'active': ''}"
            >
                <span
                    ${meta}
                    class="material-icons"
                >${button.icon}
                </span>
            </div>`
}

export function createToolbar(state = {}) {
    const textAlign = state['textAlign']
    const isLeftAlign = textAlign === 'left'
    const isRightAlign = textAlign === 'right'
    const isCenterAlign = textAlign === 'center'

    const isBold = state['fontWeight'] === 'bold'
    const isItalic = state['fontStyle'] === 'italic'
    const isUnderline = state['textDecoration'] === 'underline'

    const buttons = [{
            icon: 'format_align_left',
            active: isLeftAlign,
            value: {
                textAlign: 'left'
            }
        },
        {
            icon: 'format_align_center',
            active: isCenterAlign,
            value: {
                textAlign: 'center'
            }
        },
        {
            icon: 'format_align_right',
            active: isRightAlign,
            value: {
                textAlign: 'right'
            }
        },
        {
            icon: 'format_bold',
            active: isBold,
            value: {
                fontWeight:  isBold ? 'normal' : 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: isItalic,
            value: {
                fontStyle: isItalic ? 'normal' : 'italic'
            }
        },
        {
            icon: 'format_underlined',
            active: isUnderline,
            value: {
                textDecoration: isUnderline ? 'none' : 'underline' 
            }
        },
    ]
    return buttons.map(createButton).join('')
}