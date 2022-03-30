import { useLoaderData, Link, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { useEffect, setData, useState } from 'react';
import Button from "../components/Button";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  console.log(snippets);

  return snippets; 
}

export default function Index() {
  let snippets = useLoaderData();
  const [selectedOption, setSelectedOption] = useState();

  const sortBy = (e) => {
    setSelectedOption(e.target.value);
    // console.log(e);
  
  if(e.target.value == "Title") {
    const sortedSnippets = snippets.sort((a, b) => a.title.localeCompare(b.title)
    );
    snippets = sortedSnippets;
  }
}

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My code snippets</h1>
      <Form method="GET" action="search">
        <input type="text" name="q" className="mr-4 h-10 w-44" />
        <Button type="submit">Search</Button>
      </Form>

      {/* <label>Sort by</label> */}
      <select name="" id="" value={selectedOption} className=" w-44 h-7 mb-6" onChange={sortBy}>
        <option value="value">Sort By</option>
        <option value="Title">Title</option>
        <option value="Date">Date</option>
      </select>

      <div className="grid gap-4 grid-cols-3">
        {snippets.map((snippet) => {
          return (
            <article className=" p-4 bg-white mb-2 rounded-xl" key={snippet._id}>
                <Link
                  to={`/snippets/${snippet._id}`}
                  className="text-blue-600 hover:underline">
                  <p className=" font-bold">{snippet.title}</p>
                  <p className=" text-xs uppercase">{snippet.language}</p>
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
    </div>
  );
}
