import { useLoaderData, useCatch, json, Form, redirect } from "remix";
import connectDb from "~/db/connectDb.server.js";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import Button from "~/components/Button.jsx";
import { BsBookmark } from "@react-icons/all-files/bs/BsBookmark";
import { BsBookmarkFill } from "@react-icons/all-files/bs/BsBookmarkFill";


export async function action({ params, request }) {
  const form = await request.formData();
  const db = await connectDb();
  const snippetID = form.get("id");
  const action = form.get("_action");


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

  if(action === "favourite") {
    const form = await request.formData();
    const db = await connectDb();

    try {
      const snippet = await db.models.Snippet.findById(params.snippetId);
      snippet.favourite = !snippet.favourite;
      await snippet.save();

      return null;
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
  console.log(params);
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
      <p className="uppercase">{snippet.language}</p>
      <div className=" flex flex-row">
        <Form method="POST">
              <input type="hidden" name="_action" value="favourite"></input>
              <button type="submit">{snippet.favourite ? <BsBookmarkFill className=" float-left mr-2 text-3xl" /> : <BsBookmark className=" float-left mr-2 text-3xl" />}</button>
        </Form>
        <h1 className="text-2xl font-bold mb-4 capitalize">{snippet.title}</h1>
      </div>
      {/* <code> */}
        {/* <pre>{JSON.stringify(snippet, null, 2)}</pre> */}
      {/* </code> */}
      <pre>{snippet?.snippet}</pre>
      
      <p className="block mb-4">{snippet.description}</p>
      <textarea className="block">{snippet.codeSnippet}</textarea>

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
