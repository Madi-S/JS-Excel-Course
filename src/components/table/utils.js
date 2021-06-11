export function pxToInt(width) {
    const lastIndex = width.length - 2
    return Number(width.slice(0, lastIndex))
}

export function clearSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            window.getSelection().empty()
        } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges()
        }
    } else if (window.selection) {
        window.selection.empty()
    }
}