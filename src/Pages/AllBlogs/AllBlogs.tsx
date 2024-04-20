import { useEffect, useState } from "react";

interface Blog {
  title: string;
  description: string;
  contentType: string;
  contentImage: string;
}

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  return (
    <div className="my-16">
      <h1 className="text-center text-3xl font-bold mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mx-6 md:mx-8 lg:mx-20">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
          >
            <div className="p-4">
              <img
                src={blog.contentImage}
                alt={blog.title}
                className="w-full h-64 object-cover rounded"
              />
            </div>

            <h2 className="text-xl font-bold text-center pt-4 mb-3">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-6 flex-grow px-4">
              {blog.description}
            </p>
            <div className="flex justify-center mb-4">
              <p className="bg-green-600 text-white font-semibold rounded-lg text-[16px] py-2 px-4">
                {blog.contentType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
