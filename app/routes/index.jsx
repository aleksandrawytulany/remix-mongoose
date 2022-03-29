import { useLoaderData, Link, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { useEffect, setData, useState } from 'react';
import Button from "../components/Button";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  // .sort({ title: 1 })
  console.log(snippets);

  return snippets; 
}

export default function Index() {
  const snippets = useLoaderData();

  async function sortTitles() {
    snippets.sort({ title: 1});
    console.log(snippets);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My code snippets</h1>
      <Form method="GET" action="search">
        <input type="text" name="q" className="mr-4 h-10" />
        <Button type="submit">Search</Button>
      </Form>
      <button type="submit" onClick={sortTitles} className="py-2">
        Sort snippets
      </button>

      <div className="grid gap-4 grid-cols-2">
        {snippets.map((snippet) => {
          return (
            <article className=" p-4 bg-white mb-2 rounded-xl" key={snippet._id}>
                <Link
                  to={`/snippets/${snippet._id}`}
                  className="text-blue-600 hover:underline">
                  <p className=" font-bold">{snippet.title}</p>
                </Link>
              </article>
            // <li key={snippet._id}>
            //   <Link
            //     to={`/snippets/${snippet._id}`}
            //     className="text-blue-600 hover:underline">
            //     {snippet.title}
            //   </Link>
            // </li>
          );
        })}
        </div>

      {/* <button onClick={sortTitles}>
        Sort titles
      </button> */}

      {/* <button onClick={(e) => setSortTitles(e.target.value)}> 
        Sort title
      </button> */}

    </div>
  );
}
