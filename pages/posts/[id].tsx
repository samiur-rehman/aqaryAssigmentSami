import axios from "axios";
import { GetServerSideProps } from "next";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

interface Posts {
  post: Post;
}

const PostDetails = ({ post }: Posts) => {
  if (!post || !post.id) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-red-600">
          Error loading post...
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{post?.title}</h1>
        <p className="text-gray-700 mb-4">{post?.body}</p>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Comments</h2>
          <ul className="divide-y divide-gray-200">
            {post?.comments.map((comment) => (
              <li key={comment.id} className="py-4">
                <h3 className="text-lg font-bold">{comment.name}</h3>
                <p className="text-gray-700 mb-2">{comment.body}</p>
                <p className="text-gray-500">{comment.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const postResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const commentResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    const post: Post = postResponse.data;
    const comments: Comment[] = commentResponse.data;

    return {
      props: {
        post: {
          ...post,
          comments,
        },
      },
    };
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return {
      props: {
        post: {},
      },
    };
  }
};
