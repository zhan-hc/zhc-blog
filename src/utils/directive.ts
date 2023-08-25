
export const imgError = {
    created(el: HTMLElement) {
        console.log(el, 'el')
        el.onerror = () => {
            !el.classList.contains('error') && el.classList.add('error')
        }
    },
}
