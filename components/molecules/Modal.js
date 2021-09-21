import PropTypes from "prop-types";
import ReactModal from "react-modal";

function Modal({ isOpen, setIsOpen, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Save Preset"
      className="outline-none"
      overlayClassName="z-20 flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 backdrop-blur-lg"
    >
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default Modal;