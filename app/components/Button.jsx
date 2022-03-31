import { Link } from "remix";

export default function Button({ type, destructive = false, children, ...rest }) {
  let className = `${
    destructive ? "bg-red-500 hover:bg-red-400 transition" : "bg-blue-500 hover:bg-blue-400 transition"
  } text-white font-bold py-2 px-4 rounded my-3 inline-block`;

  return (
    <button className={className} type={type} {...rest}>
      {children}
    </button>
  );
}