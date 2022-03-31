import { Form, redirect, json, useActionData } from "remix";
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

export default function CreateBook() {
  const actionData = useActionData();
  return (
    <div>
      {/* <Breadcrumb links={[{ to: "/books", title: "Books" }]} /> */}
      <h1 className="text-2xl font-bold mb-10">Create snippet</h1>
      <Form method="post">
        {/* snippet title */}
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={actionData?.values.title}
          id="title"
          className={
            actionData?.errors.title ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.title && (
          <p className="text-red-500">{actionData.errors.title.message}</p>
        )}

        {/* programming language */}
        <label htmlFor="language" className="block">
          Language
        </label>
        <input
          type="text"
          name="language"
          defaultValue={actionData?.values.language}
          id="author"
          className={
            actionData?.errors.language ? "border-2 border-red-500" : null
          }
        />

        {/* code description */}
        <label htmlFor="description" className="block">
          Code description
        </label>
        <textarea
          type="text"
          name="description"
          defaultValue={actionData?.values.description}
          id="description"
          className={
            actionData?.errors.description ? "border-2 border-red-500" : null
          }
        />
        {/* code snippet */}
        <label htmlFor="codeSnippet" className="block">
          Code snippet
        </label>
        <textarea
          type="text"
          name="codeSnippet"
          defaultValue={actionData?.values.codeSnippet}
          id="codeSnippet"
          className= {
            actionData?.errors.codeSnippet ? "border-2 border-red-500" : null
          }
        /> <br />

        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}
