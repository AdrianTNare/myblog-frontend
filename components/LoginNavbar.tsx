import { useRouter } from "next/router";
import { VscHome } from "react-icons/vsc";
import { useAuth } from "../contexts/Auth";

export const LoginNavbar = () => {
  const { push } = useRouter();
  const { user } = useAuth();

  return (
    <div className="navbar bg-base-100 rounded-lg mb-8 shadow-xl mt-5">
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
              <a onClick={() => push("/")}>Homepage</a>
            </li>
            {user?.authToken && (
              <>
                <li>
                  <a onClick={() => push("/user/try")}>My Blog</a>
                </li>
                <li onClick={() => push("/newPost")}>
                  <a>New Post</a>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl hidden lg:flex">
          Blog name
        </a>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl ">Login</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={() => push("/")}>
          <VscHome className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
