'use client'

interface ModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => boolean | void
  children: React.ReactNode
}

const Modal = ({ modalOpen, setModalOpen, children }: ModalProps) => {
  return (
    <dialog 
      id="my_modal_1" 
      className={`modal ${modalOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box">
        {children}
      </div>
    </dialog>
  )
}

export default Modal