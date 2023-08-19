import PropTypes from "prop-types";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";
import { useState } from "react";
import { useAuth, errorTypes } from "../../../firebase/Firebase";
import { useRouter } from "next/router";
import { ACTION_DELAYS } from "../../../utils/constants";
import Modal from "../Modal";

export const authTypes = {
  signUp: "signUp",
  login: "login",
};

function AuthModal({ isOpen, setIsOpen }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { signUp, signIn } = useAuth();

  function clearState() {
    setUsername("");
    setUsernameError(null);
    setPassword("");
    setPasswordError(null);
    setSuccess(false);
    setSignUpSuccess(false);
    setLoginSuccess(false);
  }

  async function handleSubmit(type) {
    setUsernameError(null);
    setPasswordError(null);

    const action = type === authTypes.signUp ? signUp : signIn;

    const { user, error } = await action(username, password);

    if (user) {
      setSuccess(true);

      type === authTypes.signUp
        ? setSignUpSuccess(true)
        : setLoginSuccess(true);

      setTimeout(() => {
        handleClose();
      }, ACTION_DELAYS.long);
    } else {
      const { msg, type } = error;

      switch (type) {
        case errorTypes.username:
          setUsernameError(msg);
          break;
        case errorTypes.password:
          setPasswordError(msg);
          break;
        case errorTypes.unknown:
        default:
          setUsernameError(msg);
          setPasswordError(msg);
          break;
      }
    }
  }

  function handleClose() {
    clearState();
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <InputCard>
        <Header
          icon={iconTypes.user}
          heading="Your Account"
          description="You need an account to save your presets"
        />

        <div className="w-full flex flex-col justify-start items-center gap-24 420:gap-32">
          <TextInput
            name="username"
            type={textInputTypes.text}
            bigLabel="Username"
            widthStyle="w-full"
            value={username}
            handleChange={(value) => {
              setUsername(value);
              setUsernameError(null);
            }}
            errorLabel={usernameError}
            hasSuccess={success}
          >
            Your username
          </TextInput>

          <TextInput
            name="password"
            type={textInputTypes.password}
            bigLabel="Password"
            widthStyle="w-full"
            value={password}
            handleChange={(value) => {
              setPassword(value);
              setPasswordError(null);
            }}
            errorLabel={passwordError}
            hasSuccess={success}
          >
            Your Password
          </TextInput>

          <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
            <Button
              isSubmit
              type={signUpSuccess ? buttonTypes.success : buttonTypes.primary}
              handleClick={() => handleSubmit(authTypes.signUp)}
            >
              Sign Up
            </Button>
            <Button
              isSubmit
              type={loginSuccess ? buttonTypes.success : buttonTypes.primary}
              handleClick={() => handleSubmit(authTypes.login)}
            >
              Login
            </Button>
          </div>
        </div>
      </InputCard>
    </Modal>
  );
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default AuthModal;
