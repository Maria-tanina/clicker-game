export function closeModal(modal) {
    modal.classList.remove('show');
    modal.classList.add('hide');
   }
export function openModal(modal) {
    modal.classList.add('show');
    modal.classList.remove('hide');
   }