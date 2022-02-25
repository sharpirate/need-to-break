import AuthCard, { authTypes } from "../components/molecules/cards/AuthCard";

function LoginPage() {
  return <AuthCard type={authTypes.login} />
}

export default LoginPage;