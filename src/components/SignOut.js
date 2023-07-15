import { signOut } from "firebase/auth";

const SignOut = ({ auth, user }) => {
  return (
    <img
      src={user.photoURL}
      alt="Account Profile"
      className="w-6 h-6 rounded-full hover:cursor-pointer"
      onClick={() => signOut(auth)}
    />
  );
};

export default SignOut;
