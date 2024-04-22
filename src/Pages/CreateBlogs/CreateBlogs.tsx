import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [contentType, setContentType] = useState("");
  const [contentTypeError, setContentTypeError] = useState("");
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [contentImageError, setContentImageError] = useState(false);
  const navigate = useNavigate();
  const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  useEffect(() => {
    const email = JSON.parse(
      localStorage.getItem("personal-details") || "{}"
    ).email;
    const userName = JSON.parse(
      localStorage.getItem("personal-details") || "{}"
    ).name;
    if (!email) {
      navigate("/login");
    } else if (!userName) {
      navigate("/personal-details");
    }
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setContentImage(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitleError(false);
    setDescriptionError(false);
    setContentTypeError("");
    setContentImageError(false);

    // Check if any field is empty
    if (!title) {
      setTitleError(true);
    }
    if (!description) {
      setDescriptionError(true);
    }
    if (!contentType) {
      setContentTypeError("Content type is required");
    }
    if (!contentImage) {
      setContentImageError(true);
    }

    // If any field is empty, prevent form submission
    if (!title || !description || !contentType || !contentImage) {
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contentType", contentType);
    if (contentImage) {
      formData.append("image", contentImage);
    }

    // Send form data to server
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to upload image. Please try again later.");
        }
        return res.json();
      })
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;

          // Create a new blog object
          const newBlog = {
            title,
            description,
            contentType,
            contentImage: imgURL,
          };

          // Get existing blogs from localStorage or initialize an empty array
          const existingBlogs = JSON.parse(
            localStorage.getItem("blogs") || "[]"
          );

          // Add the new blog to the array
          existingBlogs.push(newBlog);

          // Store the updated array back in localStorage
          localStorage.setItem("blogs", JSON.stringify(existingBlogs));

          // Show success message
          Swal.fire({
            title: "Good job!",
            text: "Congratulations! Blog Added Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/blogs");

          // Clear form fields after successful submission
          setTitle("");
          setDescription("");
          setContentType("");
          setContentImage(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show error message
        Swal.fire({
          title: "Oops...",
          text: error.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="flex justify-center items-center my-16">
      <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto">
        <form className="form p-6 bg-white rounded-xl" onSubmit={onSubmit}>
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Create Blog
          </h1>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="form-input"
            />
            {titleError && (
              <p className="text-red-600 mt-1">Title is required</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Blog Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="form-input h-32"
            ></textarea>
            {descriptionError && (
              <p className="text-red-600 mt-1">Description is required</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Blog Content Type
            </label>
            <select
              className="form-input"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
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
            {contentTypeError && (
              <p className="text-red-600 mt-1">{contentTypeError}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Content Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-input"
            />
            {contentImageError && (
              <p className="text-red-600 mt-1">Content image is required</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="login-btn text-lg font-semibold text-white px-8 py-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
