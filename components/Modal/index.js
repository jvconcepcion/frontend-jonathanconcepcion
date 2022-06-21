import { Modal, Button} from 'react-bootstrap'

const ModalComponent = ({ 
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
        size='lg'
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