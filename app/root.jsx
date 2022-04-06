import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "~/tailwind.css";
import style from "~/style.css";
import Button from "~/components/Button.jsx";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: style,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "My code snippets",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 text-slate-800 font-sans p-4">
        <header className="pb-3 mb-4 border-b-2 flex justify-between items-center">
          <Link to="/" className="hover:underline text-blue-600 font-bold">
            Snippets Library
          </Link>
          <Link to="/snippets/new" className="ml-3 hover:underline text-blue-600 font-bold">
            <Button>New code</Button>
          </Link>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}