import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { TRANSITIONS } from "../../utils/constants";

function Modal({ isOpen, handleClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Save Preset"
      className="outline-none"
      overlayClassName="z-20 flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 backdrop-blur-lg"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: TRANSITIONS.springBounce500,
        }}
      >
        {children}
      </motion.div>
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Modal;
