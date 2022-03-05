import PropTypes from "prop-types";
import React from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import Modal from "../Modal";
import { useAuth } from "../../../firebase/Firebase";

function LogoutModal({ isOpen, setIsOpen}) {
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    handleClose(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <InputCard>
        <Header
          icon={iconTypes.logout}
          heading="Logout"
          description="Active timeline will be lost"
        />

        <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
          <Button handleClick={handleClose} type={buttonTypes.outline}>Cancel</Button>
          <Button handleClick={handleLogout} type={buttonTypes.delete}>Logout</Button>
        </div>
      </InputCard>
    </Modal>
  );
}

LogoutModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  presetName: PropTypes.string
};

export default LogoutModal;