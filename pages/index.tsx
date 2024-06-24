import Link from "next/link";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostLists = {
  posts: Post[];
};

export default function Posts({ posts }: PostLists) {
  const truncateText = (text: string, maxLength = 100): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts List</h1>
      <ul className="space-y-2">
        {posts?.map((post) => (
          <li
            key={post.id}
            className="bg-white shadow-md p-4 rounded-lg overflow-hidden hover:shadow-xl duration-300"
          >
            <Link href={`/posts/${post?.id}`}>
              <div className="block">
                <h2 className="text-xl font-semibold text-blue-500 mb-2">
                  {post?.title}
                </h2>
                <p className="text-gray-600">{truncateText(post?.body)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts: Post[] = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
