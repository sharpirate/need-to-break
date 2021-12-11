import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";

function SignUp() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.user}
        heading="Create Your Account"
      />

      <form autoComplete="off" className="w-full flex flex-col justify-start items-center gap-24 420:gap-32">

        <TextInput
          name="username"
          type={textInputTypes.text}
          bigLabel="Username"
          widthStyle="w-full"
        >
          Your Username
        </TextInput>

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

        <TextInput
          name="confirmPassword"
          type={textInputTypes.password}
          bigLabel="Confirm Password"
          widthStyle="w-full"
        >
          Confirm Password
        </TextInput>

        <div className="mt-16">
          <Button type={buttonTypes.primary}>Sign Up</Button>
        </div>

      </form>
    </InputCard>
  );
}

export default SignUp;