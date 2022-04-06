import { useLoaderData, Link, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { useState } from 'react';
import Button from "../components/Button";
// import { formatDate } from "~/utils/helpers";
import { BsBookmark } from "@react-icons/all-files/bs/BsBookmark";
import { BsBookmarkFill } from "@react-icons/all-files/bs/BsBookmarkFill";

export async function loader( { params, request } ) {
  const url = new URL(request.url);
  const querry = url.searchParams.get("q");
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();

  if(querry) {
    const searchTitle = await db.models.Snippet.find( {
      title: new RegExp(querry, "i"),
    } );
    return searchTitle;
  }
  console.log(snippets);
  return snippets; 
}

export default function Index() {
  const [selectedOption, setSelectedOption] = useState();
  let snippets = useLoaderData();
  let sortedSnippets = [];

  const sortBy = (e) => {
    setSelectedOption(e.target.value);
  
      if(e.target.value == "Title") {
        sortedSnippets = snippets.sort((a, b) => a.title.localeCompare(b.title)
        );
        // snippets = sortedSnippets;
      }

      if (e.target.value == "dateUpdated") {
        sortedSnippets = snippets.sort(
          (a, b) => { return a.date_updated > b.date_updated ? 1 : -1;}
        );
      }

      if(e.target.value == "favourited") {
        sortedSnippets = snippets.sort(
          (a, b) => { return a.favourite < b.favourite  ? 1 : -1;}
        );
        // return sortedSnippets;
    }
    snippets = sortedSnippets;
  }

  return (
    <div>
      <section>
        <h1 className="text-2xl font-bold mb-10">My code snippets</h1>
      </section>

      <div className="flex items-baseline">
      <Form method="GET">
        <input type="text" name="q" className="mr-4 h-10 w-80 focus:outline-blue-500" />
        <Button type="submit">Search</Button>
      </Form>

      {/* <label>Sort by</label> */}
      <select name="" id="" value={selectedOption} className=" w-44 h-10 mb-6 ml-6" onChange={sortBy}>
        <option value="value">Sort By</option>
        <option value="Title">Title</option>
        <option value="dateUpdated" defaultValue="dateUpdated">Date</option>
        <option value="favourited">Favourite</option>
      </select>

      </div>

      <div className="grid gap-4 grid-cols-4">
        {snippets.map((snippet) => {
          console.log(snippet)
          return (
            <Link
              to={`/snippets/${snippet._id}`}
              className=" text-black" 
              key={snippet._id}>
                <article className=" p-4 bg-white mb-2 rounded-xl border-t-4 border-blue-300 hover:border-4 duration-300" >
                {snippet.favourite ? <BsBookmarkFill className=" float-right" />  : <BsBookmark className=" float-right"  />}
                  <p className=" uppercase text-sm">{snippet.language}</p>
                  <h3 className=" font-bold capitalize text-xl">{snippet.title}</h3>
                  <p className=" text-xs mt-4">{snippet.createdDate}</p>
                </article>
            </Link>
          );
        })}
        </div>
    </div>
  );
}
