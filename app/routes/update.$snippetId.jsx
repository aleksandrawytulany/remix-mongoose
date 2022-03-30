import { Form, redirect, json, useLoaderData } from "remix";
import connectDb from "~/db/connectDb.server";
import Button from "~/components/Button.jsx";
// import Breadcrumb from "~/components/Breadcrumb.jsx";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  const title = form.get("title");
  const language = form.get("language");
  const codeSnippet = form.get("codeSnippet");
  const description = form.get("description");

  try {
    const newBook = await db.models.Snippet.create({ title, language, codeSnippet, description });
    return redirect(`/snippets/${newBook._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
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

export default function CreateBook() {
  const snippet = useLoaderData();

  return (
    <div>
      {/* <Breadcrumb links={[{ to: "/books", title: "Books" }]} /> */}
      <h1 className="text-2xl font-bold mb-4">Update snippet</h1>
      <Form method="post">
        {/* snippet title */}
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={snippet.title}
          id="title"
          className={
            snippet.title ? "border-2 border-red-500" : null
          }
        />
        {/* {actionData?.errors.title && (
          <p className="text-red-500">{actionData.errors.title.message}</p>
        )} */}

        {/* programming language */}
        <label htmlFor="language" className="block">
          Language
        </label>
        <input
          type="text"
          name="language"
          defaultValue={snippet.language}
          id="author"
          className={
            snippet.language ? "border-2 border-red-500" : null
          }
        />

        {/* code snippet */}
        <label htmlFor="codeSnippet" className="block">
          Code snippet
        </label>
        <input
          type="textarea"
          name="codeSnippet"
          defaultValue={snippet.codeSnippet}
          id="codeSnippet"
          className={
            snippet.codeSnippet ? "border-2 border-red-500" : null
          }
        />

        {/* code description */}
        <label htmlFor="description" className="block">
          Code description
        </label>
        <input
          type="textarea"
          name="description"
          defaultValue={snippet.description}
          id="description"
          className={
            snippet.description ? "border-2 border-red-500" : null
          }
        />
        <br />
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}
