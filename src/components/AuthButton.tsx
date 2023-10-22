import useLogin from "@/components/useLogin";

export default function AuthButton() {
  const { isLoggedIn, username, login, logout } = useLogin();

  return (
    <button
      aria-label={isLoggedIn ? 'logout' : 'login'}
      className="sentry-mask"
      onClick={() => {
        // if (isLoggedIn) {
        //   logout();
        // } else {
        //   login("Secret user");
        // }
      }}
    >
      <div className="hover:bg-red text-white px-2 py-1 rounded-md text-md block">
        {isLoggedIn ? username : "Log In"}
      </div>
    </button>
  );
}
