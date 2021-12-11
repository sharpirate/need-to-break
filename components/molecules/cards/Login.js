import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";

function Login() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.padlock}
        heading="Login"
      />

      <form autoComplete="off" className="w-full flex flex-col justify-start items-center gap-24 420:gap-32">

        <TextInput
          name="emai"
          type={textInputTypes.email}
          bigLabel="Email"
          widthStyle="w-full"
        >
          Your Email
        </TextInput>

        <TextInput
          name="password"
          type={textInputTypes.password}
          bigLabel="Password"
          widthStyle="w-full"
        >
          Your Password
        </TextInput>

        <div className="mt-16">
          <Button type={buttonTypes.primary}>Login</Button>
        </div>

      </form>
    </InputCard>
  );
}

export default Login;