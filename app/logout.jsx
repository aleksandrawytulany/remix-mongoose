import { redirect } from "remix";
import { destroySession, getSession } from "~/session.js";

export async function action({ request }) {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/logout", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export function loader() {
    return redirect("/logut");
}