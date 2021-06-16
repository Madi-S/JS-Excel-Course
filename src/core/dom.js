class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    set html(html) {
        this.$el.innerHTML = html
        return this
    }

    get html() {
        return this.$el.outerHTML.trim()
    }

    set text(text) {
        this.$el.textContent = text
        return this
    }

    get text() {
        return this.$el.textContent 
    }

    get data() {
        return this.$el.dataset
    }

    get clasess() {
        return this.$el.classList
    }

    closest(selector) {
        return this.$el.closest(selector)
    }

    clear() {
        this.html = ''
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
        return this
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        const $els = []
        const els = this.$el.querySelectorAll(selector)
        for (const el of els) {
            $els.push($(el))
        }
        return $els
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        }) 
        return this
    }

    addClasses(...classes) {
        classes.forEach(cls => this.$el.classList.add(cls))
        return this
    }

    removeClasses(...classes) {
        classes.forEach(cls => this.$el.classList.remove(cls))
        return this
    }
}

// event.target
export function $(selector) {
    return new Dom(selector)
}

$.create = (tagname, classes = '') => {
    const el = document.createElement(tagname)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}