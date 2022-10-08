import { useRouter } from "next/router";
import { useAuth } from "../contexts/Auth";

export const HomeNavbar = () => {
  const { push } = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 rounded-lg mb-16 shadow-xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            <li>
              <a onClick={() => push("/user/try")}>My Blog</a>
            </li>
            {!user?.authToken && (
              <li>
                <a onClick={() => push("/login")}>Sign Up</a>
              </li>
            )}
            <li>
              <a onClick={() => push("/newPost")}>New Post</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl hidden lg:flex">
          Blog Home
        </a>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl lg:hidden">Blog Home</a>
        {!user?.authToken && (
          <ul className="menu menu-horizontal p-0 hidden lg:flex">
            <li>
              <a onClick={() => push("/user/try")}>My Blog</a>
            </li>
            <li>
              <a onClick={() => push("/login")}>Sign Up</a>
            </li>
            <li>
              <a onClick={() => push("/newPost")}>New Post</a>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-end">
        {user?.authToken ? (
          <>
            <ul className="menu menu-horizontal p-0 hidden lg:flex">
              <li>
                <a onClick={() => push("/user/try")}>My Blog</a>
              </li>
              {!user?.authToken && (
                <li>
                  <a onClick={() => push("/login")}>Sign Up</a>
                </li>
              )}
              <li>
                <a onClick={() => push("/newPost")}>New Post</a>
              </li>
            </ul>
            <a className="btn btn-outline btn-sm mx-4" onClick={() => logout()}>
              Log Out
            </a>
          </>
        ) : (
          <a
            className="btn btn-outline border-primary text-primary btn-sm mx-4"
            onClick={() => push("/login")}
          >
            Log In
          </a>
        )}
      </div>
    </div>
  );
};
