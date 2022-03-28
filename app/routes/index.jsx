import { useLoaderData, Link } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets; 
}

export default function Index() {
  const snippets = useLoaderData();
  snippets.sort();
  console.log(snippets);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My code snippets</h1>
      {/* <h2 className="text-lg font-bold mb-3">
        Here are a few of my favorite code snippets:
      </h2> */}
      <ul className="ml-5 list-disc">
        {snippets.map((snippet) => {
          return (
            <li key={snippet._id}>
              <Link
                to={`/snippets/${snippet._id}`}
                className="text-blue-600 hover:underline">
                {snippet.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
