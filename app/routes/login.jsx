import { json, redirect, useLoaderData, Form, useActionData } from "remix";
import { getSession, commitSession } from"~/session.js";
import Button from "../components/Button";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import connectDb from "~/db/connectDb.server.js";

// import { sessionCookie } from "~/cookies.js";

export async function action({ request }) {
    const session = await getSession(request.headers.get("Cookie"));
    const db = await connectDb();
    const form = await request.formData();

    const user = await db.models.User.findOne({
        username: form.get("username").trim(),
        password: form.get("password").trim(),
    });


    if (user) {
        session.set("userId", user._id);
        return redirect("/login", { 
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } else {
        return json(
            { errorMessage: "User not found"},
            { status: 401 }
        );
    }
}

export async function loader({ request }) {
    const session = await getSession(request.headers.get("Cookie"));
    return json({ 
            userId: session.get("userId"), 
        });
    }


export default function Login() {
  const { userId } = useLoaderData();
  const actionData = useActionData();

  if (userId) {
    return (
        <div>
            <Breadcrumb links={[{ to: "/", title: "Back to snippets" }]} />
            <h2 className=" text-2xl text-black font-bold">You're logged in as a user id {userId}.</h2>
            <Form method="post" action="/logut">
                <Button type="submit" destructive>Logout</Button>
            </Form>
            {/* <pre className=" italic text-base my-4">
                {JSON.stringify(cookie, null, 2)}
                {userId}
            </pre> */}
        </div>
    );
  } return (
        <div>
            <h2 className=" text-2xl text-black font-bold">Log in</h2>
            {actionData?.errorMessage ? (
                <p>{actionData.errorMessage}</p>
            ) : null }
            <Form method="post">
                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <Button type="submit">Login</Button>
            </Form>
        </div>
      ); 
    }