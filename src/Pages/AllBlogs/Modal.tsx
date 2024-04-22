import "./Modal.css";
import { useState } from "react";

interface Blog {
  title: string;
  description: string;
  contentType: string;
  contentImage: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBlog: Blog) => void;
  blog: Blog | null;
}

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const Modal = ({ isOpen, onClose, onSave, blog }: Props) => {
  const [updatedBlog, setUpdatedBlog] = useState<Blog | null>(blog);
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);

      // Update the updatedBlog state with the new image URL
      if (updatedBlog) {
        const updatedBlogCopy = { ...updatedBlog };
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            updatedBlogCopy.contentImage = reader.result;
            setUpdatedBlog(updatedBlogCopy);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (updatedBlog) {
      setUpdatedBlog({ ...updatedBlog, [name]: value });
    }
  };

  const onConfirm = () => {
    if (updatedBlog) {
      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const imgURL = imgResponse.data.display_url;
              const updatedBlogWithImage = {
                ...updatedBlog,
                contentImage: imgURL,
              };
              onSave(updatedBlogWithImage); // Call onSave after image upload
              onClose();
            } else {
              console.error("Image upload failed");
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        onSave(updatedBlog);
        onClose();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={`overlay ${isOpen ? "open" : ""}`}
          onClick={onClose}
        ></div>
      )}
      <div className={`modal ${isOpen ? "open" : ""}`}>
        {blog && (
          <div className="modal-box">
            <h3 className="font-semibold text-xl">Edit Blog</h3>
            <hr className="my-2" />
            <div className="mb-1 text-start flex flex-col">
              <label
                htmlFor="blog-title"
                className="block text-black text-lg font-semibold mb-1"
              >
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                id="blog-title"
                value={updatedBlog?.title || blog.title}
                className="form-input w-full text-[16px] font-medium"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-1 text-start flex flex-col">
              <label
                htmlFor="blog-desc"
                className="block text-black text-lg font-semibold mb-1"
              >
                Blog Description
              </label>
              <textarea
                name="description"
                id="blog-desc"
                value={updatedBlog?.description || blog.description}
                placeholder="Description"
                className="form-input h-32"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-1 text-start flex flex-col">
              <label
                htmlFor="blog-content-type"
                className="block text-black text-lg font-semibold mb-1"
              >
                Blog Content Type
              </label>
              <select
                name="contentType"
                id="blog-content-type"
                className="form-input"
                value={updatedBlog?.contentType || blog.contentType}
                onChange={handleInputChange}
              >
                <option value="">Select Content Type</option>
                <option value="Food">Food</option>
                <option value="Tech">Tech</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Art & Creativity">Art & Creativity</option>
                <option value="Fashion">Fashion</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Fitness">Fitness</option>
                <option value="Photography">Photography</option>
                <option value="Motivational">Motivational</option>
                <option value="Book Review">Book Review</option>
                <option value="Environmental">Environmental</option>
                <option value="Gardening">Gardening</option>
                <option value="Personal Finance">Personal Finance</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className="mb-1">
              <label
                htmlFor="content-image"
                className="block text-black text-lg font-semibold mb-1"
              >
                Content Image
              </label>
              <img
                src={updatedBlog?.contentImage || blog.contentImage}
                alt="Previous"
                className="w-full mb-2 h-28 object-cover"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="form-input"
              />
            </div>
            <div className="flex justify-evenly mt-4">
              <button
                className="btn bg-green-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg"
                onClick={onConfirm}
              >
                Save
              </button>
              <button
                className="btn bg-red-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
