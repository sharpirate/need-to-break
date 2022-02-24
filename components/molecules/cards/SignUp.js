import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";
// import { getAuthInstance } from "../../../firebase/Firebase";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useAuth } from "../../../firebase/Firebase";
import { useRouter } from "next/router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const { user, error } = await signUp(email, password)
    if (user) {
      router.push('/active');
    }
  } 
  
  return (
    <InputCard>
      <Header
        icon={iconTypes.user}
        heading="Create Your Account"
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
          <Button isSubmit type={buttonTypes.primary}>Sign Up</Button>
        </div>

      </form>
    </InputCard>
  );
}

export default SignUp;