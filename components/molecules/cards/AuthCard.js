import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";
import { useState } from "react";
import { useAuth, errorTypes } from "../../../firebase/Firebase";
import { useRouter } from "next/router";
import { ACTION_DELAYS } from "../../../utils/constants";

export const authTypes = {
  signUp: "signUp",
  login: "login",
};

function AuthCard({ type }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { signUp, signIn } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const action = type === authTypes.signUp ? signUp : signIn;

    const { user, error } = await action(username, password);

    if (user) {
      setSuccess(true);

      setTimeout(() => {
        router.push("/active");
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

  return (
    <InputCard>
      <Header
        icon={type === authTypes.signUp ? iconTypes.user : iconTypes.padlock}
        heading={type === authTypes.signUp ? "Create Your Account" : "Login"}
      />

      <form
        autoComplete="off"
        className="w-full flex flex-col justify-start items-center gap-24 420:gap-32"
        onSubmit={handleSubmit}
      >
        <TextInput
          name="text"
          type={textInputTypes.text}
          bigLabel="Text"
          widthStyle="w-full"
          value={username}
          handleChange={(value) => {
            setUsername(value);
            setUsernameError(null);
          }}
          errorLabel={usernameError}
          hasSuccess={success}
        >
          Your Username
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

        <div className="mt-16">
          <Button
            isSubmit
            type={success ? buttonTypes.success : buttonTypes.primary}
          >
            {type === authTypes.signUp ? "Sign Up" : "Login"}
          </Button>
        </div>
      </form>
    </InputCard>
  );
}

export default AuthCard;
