
export const imgError = {
    created(el: HTMLElement) {
        el.onerror = () => {
            !el.classList.contains('error') && el.classList.add('error')
        }
    },
}
