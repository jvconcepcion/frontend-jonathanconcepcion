import { Modal, Button} from 'react-bootstrap'

const ModalComponent = ({ 
  size='sm',
  title = '',
  show = false,
  children,
  handleClose = () => console.log("Close"),
}) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size={size}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalComponent