import Popover from 'react-bootstrap/Popover'
import CloseButton from 'react-bootstrap/CloseButton'
import Overlay from 'react-bootstrap/Overlay'

const PopoverComponent = ({ 
  show, 
  closeFunction = () => console.log("Close"),
  targetEvent, 
  placement = 'top', 
  containerRef, 
  containerPadding = 20,
  title = '',
  children
}) => {
  return (
    <Overlay
      show={show}
      target={targetEvent}
      placement={placement}
      container={containerRef}
      containerPadding={containerPadding}
    >
      <Popover id="popover-contained">
        <Popover.Header as="h3" style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        >
          {title}
          <span style={{ float: 'right', marginLeft: '50px'}}>
            <CloseButton onClick={() => closeFunction()}/>
          </span>
        </Popover.Header>
        <Popover.Body>
          {children}
        </Popover.Body>
      </Popover>
    </Overlay>
  )
}

export default PopoverComponent