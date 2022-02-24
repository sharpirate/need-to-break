import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";
import { useState } from "react";
import { useAuth } from "../../../firebase/Firebase";
import { useRouter } from "next/router";
import { usePageChange } from "../../../utils/pageChangeUtil";
import { DIRECTIONS } from "../../../utils/constants";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const { pushPage } = usePageChange();

  async function handleSubmit(e) {
    e.preventDefault();

    const { user, error } = await signIn(email, password)
    if (user) {
      pushPage('/active', DIRECTIONS.right);
    } else {
      console.log(error)
    }
  }

  return (
    <InputCard>
      <Header
        icon={iconTypes.padlock}
        heading="Login"
      />

      <form autoComplete="off" className="w-full flex flex-col justify-start items-center gap-24 420:gap-32" onSubmit={handleSubmit}>

        <TextInput
          name="emai"
          type={textInputTypes.email}
          bigLabel="Email"
          widthStyle="w-full"
          value={email}
          handleChange={value => setEmail(value)}
        >
          Your Email
        </TextInput>

        <TextInput
          name="password"
          type={textInputTypes.password}
          bigLabel="Password"
          widthStyle="w-full"
          value={password}
          handleChange={value => setPassword(value)}
        >
          Your Password
        </TextInput>

        <div className="mt-16">
          <Button isSubmit type={buttonTypes.primary}>Login</Button>
        </div>

      </form>
    </InputCard>
  );
}

export default Login;