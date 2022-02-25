import AuthCard, { authTypes } from "../components/molecules/cards/AuthCard";

function SignUpPage() {
  return <AuthCard type={authTypes.signUp} />
}

export default SignUpPage;