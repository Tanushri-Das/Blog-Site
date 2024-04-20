// import { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import Modal from "./Modal";
// import { HiPencilSquare } from "react-icons/hi2";

// interface Blog {
//   title: string;
//   description: string;
//   contentType: string;
//   contentImage: string;
// }

// const AllBlogs = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   useEffect(() => {
//     const storedBlogs = localStorage.getItem("blogs");
//     if (storedBlogs) {
//       setBlogs(JSON.parse(storedBlogs));
//     }
//   }, []);

//   const openModal = (blog: Blog) => {
//     setSelectedBlog(blog);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedBlog(null);
//     setModalIsOpen(false);
//   };

//   const onSave = (updatedBlog: Blog) => {
//     const updatedBlogs = blogs.map((b) =>
//       b.title === updatedBlog.title ? updatedBlog : b
//     );
//     setBlogs(updatedBlogs);
//     localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
//   };

//   return (
//     <div className="my-16">
//       <h1 className="text-center text-3xl font-bold mb-8">All Blogs</h1>
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mx-6 md:mx-8 lg:mx-20">
//         {blogs.map((blog, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col relative"
//           >
//             <div className="p-4">
//               <img
//                 src={blog.contentImage}
//                 alt={blog.title}
//                 className="w-full h-64 object-cover rounded"
//               />
//             </div>
//             <h2 className="text-xl font-bold text-center pt-4 mb-3">
//               {blog.title}
//             </h2>
//             <p className="text-gray-600 mb-6 flex-grow px-4">
//               {blog.description}
//             </p>
//             <div className="flex justify-center mb-16">
//               <p className="bg-green-600 text-white font-semibold rounded-lg text-[16px] py-2 px-4">
//                 {blog.contentType}
//               </p>
//             </div>
//             <div className="flex justify-center space-x-3 absolute bottom-4 left-0 right-0">
//               <HiPencilSquare
//                 className="text-xl cursor-pointer"
//                 onClick={() => openModal(blog)}
//               />
//               <MdDelete className="text-xl cursor-pointer" />
//             </div>
//           </div>
//         ))}
//       </div>
//       {modalIsOpen && (
//         <Modal isOpen={modalIsOpen} onClose={closeModal} onSave={onSave} blog={selectedBlog} />
//       )}
//     </div>
//   );
// };

// export default AllBlogs;



















import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { HiPencilSquare } from "react-icons/hi2";

interface Blog {
  title: string;
  description: string;
  contentType: string;
  contentImage: string;
}

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setModalIsOpen(false);
  };

  const onSave = (updatedBlog: Blog) => {
    const updatedBlogs = blogs.map((b) =>
      b.title === selectedBlog?.title ? updatedBlog : b
    );
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setSelectedBlog(updatedBlog); // Update the selectedBlog state
  };

  return (
    <div className="my-16">
      <h1 className="text-center text-3xl font-bold mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mx-6 md:mx-8 lg:mx-20">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col relative"
          >
            <div className="p-4">
              <img
                src={blog.contentImage}
                alt={blog.title}
                className="w-full h-64 object-cover rounded"
              />
            </div>
            <h2 className="text-xl font-bold text-center pt-4 mb-3">
              {selectedBlog && selectedBlog.title === blog.title
                ? selectedBlog.title // Render the updated title if selectedBlog is updated
                : blog.title}
            </h2>
            <p className="text-gray-600 mb-6 flex-grow px-4">
              {selectedBlog && selectedBlog.title === blog.title
                ? selectedBlog.description // Render the updated description if selectedBlog is updated
                : blog.description}
            </p>
            <div className="flex justify-center mb-16">
              <p className="bg-green-600 text-white font-semibold rounded-lg text-[16px] py-2 px-4">
                {selectedBlog && selectedBlog.title === blog.title
                  ? selectedBlog.contentType // Render the updated content type if selectedBlog is updated
                  : blog.contentType}
              </p>
            </div>
            <div className="flex justify-center space-x-3 absolute bottom-4 left-0 right-0">
              <HiPencilSquare
                className="text-xl cursor-pointer"
                onClick={() => openModal(blog)}
              />
              <MdDelete className="text-xl cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={closeModal} onSave={onSave} blog={selectedBlog} />
      )}
    </div>
  );
};

export default AllBlogs;
