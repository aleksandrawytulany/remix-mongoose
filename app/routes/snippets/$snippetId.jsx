import { useLoaderData, useCatch, json, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import Button from "~/components/Button.jsx";

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
      <code>
        <pre>{JSON.stringify(snippet, null, 2)}</pre>
      </code>
      <div className=" flex justify-between w-48">
        <Button type="submit" destructive>
            Delete
          </Button>

          <Button type="submit">
            Update
          </Button>
        </div>
      {/* <Form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <input type="hidden" name="_method" value="delete" />
        <button type="submit" className="mr-2" destructive>
          Delete
        </button>
      </Form> */}

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
