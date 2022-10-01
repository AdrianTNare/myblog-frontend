export const HomeNavbar = () => {
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
              <a>My Blog</a>
            </li>
            <li>
              <a>Sign Up</a>
            </li>
            <li>
              <a>New Post</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl hidden lg:flex">
          Blog Home
        </a>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl lg:hidden">Blog Home</a>
        <ul className="menu menu-horizontal p-0 hidden lg:flex">
          <li>
            <a>My Blog</a>
          </li>
          <li>
            <a>Sign Up</a>
          </li>
          <li>
            <a>New Post</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-outline border-primary text-primary btn-sm mr-4 ">
          Log In
        </a>
        {/* <a className="btn btn-ghost btn-sm mr-4 ">Log Out</a> */}
      </div>
    </div>
  );
};
