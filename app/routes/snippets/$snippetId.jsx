import { useLoaderData, useCatch, json, Form, redirect } from "remix";
import connectDb from "~/db/connectDb.server.js";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import Button from "~/components/Button.jsx";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  const snippetID = form.get("id");
  const action = form.get("_action");
  console.log(form);

  if(action === "delete") {
    try {
      const newBook = await db.models.Snippet.findByIdAndDelete(snippetID);
      return redirect(`/`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }

  if(action === "update") {
    try {
      return redirect(`/update/${snippetID}`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }
}

export async function loader({ params }) {
  const db = await connectDb();
  const snippet = await db.models.Snippet.findById(params.snippetId);
  if (!snippet) {
    throw new Response(`Couldn't find book with id ${params.snippetId}`, {
      status: 404,
    });
  }
  return json(snippet);
}

// export async function deleteListingByName(client, nameOfListing) {

//   const result = await db.models.Snippet.findById(params.snippetId);
//   // client.db("shop").collection("snippets")
//     .deleteOne({ title: nameOfListing });
//     console.log(`${result.deletedCount} document(s) was/were deleted.`);
// }

export default function BookPage() {
  const snippet = useLoaderData();
  return (
    <div>
      <Breadcrumb links={[{ to: "/", title: "Back to snippets" }]} />
      <h1 className="text-2xl font-bold mb-4">{snippet.title}</h1>
      {/* <code> */}
        {/* <pre>{JSON.stringify(snippet, null, 2)}</pre> */}
        <pre>{snippet?.snippet}</pre>
      {/* </code> */}

      <p>{snippet.language}</p>
      <p>{snippet.codeSnippet}</p>
      <p>{snippet.description}</p>
      <div className=" flex justify-between w-48">
        <Form method="post">
          <input type="hidden" name="id" value={snippet._id}></input>
          <Button type="submit" name="_action" value="delete" destructive>
              Delete
            </Button>
        </Form>
        <Form method="post">
            <input type="hidden" name="id" value={snippet._id}></input>
            <Button type="submit" name="_action" value="update">
              Update
            </Button>
        </Form>
        </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
