import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = ({ auth }) => {
  const provider = new GoogleAuthProvider();

  return (
    <button
      className="text-slate-300 text-xs"
      onClick={() => signInWithPopup(auth, provider)}
    >
      Sign In
    </button>
  );
};

export default SignIn;
