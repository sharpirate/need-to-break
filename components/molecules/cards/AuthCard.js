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
  signUp: 'signUp',
  login: 'login'
};

function AuthCard({ type }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { signUp, signIn } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const action = type === authTypes.signUp ? signUp : signIn;

    const { user, error } = await action(email, password);
    
    if (user) {
      setSuccess(true);

      setTimeout(() => {
        router.push('/active');
      }, ACTION_DELAYS.long)
    } else {
      const { msg, type } = error;

      switch(type) {
        case errorTypes.email:
          setEmailError(msg);
          break;
        case errorTypes.password:
          setPasswordError(msg);
          break;
        case errorTypes.unknown:
        default:
          setEmailError(msg);
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

      <form autoComplete="off" className="w-full flex flex-col justify-start items-center gap-24 420:gap-32" onSubmit={handleSubmit}>
        <TextInput
          name="emai"
          type={textInputTypes.email}
          bigLabel="Email"
          widthStyle="w-full"
          value={email}
          handleChange={value => {
            setEmail(value);
            setEmailError(null);
          }}
          errorLabel={emailError}
          hasSuccess={success}
        >
          Your Email
        </TextInput>

        <TextInput
          name="password"
          type={textInputTypes.password}
          bigLabel="Password"
          widthStyle="w-full"
          value={password}
          handleChange={value => {
            setPassword(value);
            setPasswordError(null);
          }}
          errorLabel={passwordError}
          hasSuccess={success}
        >
          Your Password
        </TextInput>

        <div className="mt-16">
          <Button isSubmit type={success ? buttonTypes.success : buttonTypes.primary}>{type === authTypes.signUp ? "Sign Up" : "Login"}</Button>
        </div>

      </form>
    </InputCard>
  );
}

export default AuthCard;