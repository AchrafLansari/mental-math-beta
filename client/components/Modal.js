import React from 'react'
import { Button, Modal as BsModal } from 'react-bootstrap'
const Modal = ({ show, handleClose, congratsResponse }) => {
  return (
    <BsModal show={show} onHide={handleClose}>
      <BsModal.Header closeButton>
        <BsModal.Title>Congratulations !</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>{congratsResponse}</BsModal.Body>
      <BsModal.Footer>
        <Button variant="primary" onClick={handleClose} block>
          Close
        </Button>
      </BsModal.Footer>
    </BsModal>
  )
}

export default Modal
