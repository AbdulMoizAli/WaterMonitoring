import {
    alertController,
    modalController,
    toastController,
} from '../lib/ionic/dist/ionic/index.esm.js';

async function showAlert(header, message, buttons) {
    const alert = await alertController.create({
        header,
        message,
        buttons,
    });

    await alert.present();
}

async function showToast(message) {
    const toast = await toastController.create({
        color: 'dark',
        duration: 2000,
        message: message,
        showCloseButton: true,
    });

    await toast.present();
}

async function showModal(name, html) {
    if (!customElements.get(name)) createModalContent(name, html);

    const modal = await modalController.create({ component: name });
    modal.present();

    return modal;
}

function createModalContent(name, content) {
    customElements.define(
        name,
        class ModalContent extends HTMLElement {
            connectedCallback() {
                this.innerHTML = content;
            }
        }
    );
}

export { showAlert, showModal, showToast };
