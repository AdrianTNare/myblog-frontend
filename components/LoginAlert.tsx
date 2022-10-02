interface Props {
  success: boolean;
  text: string;
}

export const LoginAlert = ({ success, text }: Props) => {
  const type = success ? "alert-success" : "alert-error";

  return (
    <div
      className={` alert ${type} shadow-lg w-full max-w-xs p-3 top-28 absolute animate-bounce `}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{`${success ? "Success" : "Error"}! ${text}.`}</span>
      </div>
    </div>
  );
};
