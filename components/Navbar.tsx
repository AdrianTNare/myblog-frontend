import { useRouter } from "next/router";
import { VscHome } from "react-icons/vsc";
import { LinkView } from "../app/types/types";
import { useAuth } from "../contexts/Auth";

interface Props {
  title: string;
}

export const Navbar = ({ title }: Props) => {
  const { push, pathname } = useRouter();
  const { user, logout } = useAuth();
  const pathType = pathname.split("/")[1] as LinkView;
  console.log(pathType);
  return (
    <div className="navbar bg-base-100 rounded-lg mt-5 mb-8 shadow-xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user?.authToken ? (
              <>
                {pathType !== "user" && (
                  <li>
                    <a onClick={() => push("/user/try")}>My Blog</a>
                  </li>
                )}
                {pathType !== "newPost" && (
                  <li>
                    <a onClick={() => push("/newPost")}>New Post</a>
                  </li>
                )}
                <li>
                  <a onClick={() => logout()}>Log Out</a>
                </li>
              </>
            ) : (
              <li>
                <a onClick={() => push("/login")}>Log In</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">{title}</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={() => push("/")}>
          <VscHome className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
