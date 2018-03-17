export default class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.openModalButtons = document.querySelectorAll('.open-modal');
        this.closeModalButton = document.querySelector('.modal__close');

        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.events();
    }

    events() {
        this.openModalButtons.forEach((btn) =>
            btn.addEventListener('click', this.openModal)
        );

        this.closeModalButton.addEventListener('click', this.closeModal);

        document.addEventListener('keyup', this.keyPressHandler);
    }

    keyPressHandler(e) {
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }

    openModal(e) {
        e.preventDefault();
        this.modal.classList.add('modal--is-visible');
    }

    closeModal() {
        this.modal.classList.remove('modal--is-visible');
    }
}
