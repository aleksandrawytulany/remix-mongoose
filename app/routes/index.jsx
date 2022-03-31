import { useLoaderData, Link, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { useState } from 'react';
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
      <section>
        <h1 className="text-2xl font-bold mb-10">My code snippets</h1>
      </section>

      <div className="flex items-baseline">
      <Form method="GET" action="search">
        <input type="text" name="q" className="mr-4 h-10 w-80 focus:outline-blue-500" />
        <Button type="submit">Search</Button>
      </Form>

      {/* <label>Sort by</label> */}
      <select name="" id="" value={selectedOption} className=" w-44 h-10 mb-6 ml-6" onChange={sortBy}>
        <option value="value">Sort By</option>
        <option value="Title">Title</option>
        <option value="Date">Date</option>
      </select>
      </div>

      <div className="grid gap-4 grid-cols-4">
        {snippets.map((snippet) => {
          return (
            <Link
              to={`/snippets/${snippet._id}`}
              className=" text-black" 
              key={snippet._id}>
                <article className=" p-4 bg-white mb-2 rounded-xl border-t-4 border-blue-300 hover:border-4 duration-300" >
                  <p className=" text-xs uppercase">{snippet.language}</p>
                  <h3 className=" font-bold text-lg capitalize">{snippet.title}</h3>
                </article>
            </Link>
          );
        })}
        </div>
    </div>
  );
}
