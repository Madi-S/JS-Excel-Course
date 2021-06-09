export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = document.createElement('div')
        $root.classList.add('excel')
        this.components.forEach(Component => {
            const component = new Component()
            $root.insertAdjacentHTML('beforeend', component.toHTML())
        })
        return $root
    }

    render() {
        // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
        this.$el.append(this.getRoot())
    }
}