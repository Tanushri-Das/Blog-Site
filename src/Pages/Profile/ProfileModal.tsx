import React, { useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    profilePic: string;
    age: string;
    gender: string;
  };
  onSave: (userData: any) => void;
}
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave,
}) => {
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);
  const [image, setImage] = useState(userData.profilePic);
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleSave = () => {
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
            const updatedUserData = {
              ...userData,
              name: name,
              age: age,
              gender: gender,
              profilePic: imgURL,
            };
            onSave(updatedUserData);
            onClose();
          } else {
            console.error("Image upload failed");
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      const updatedUserData = {
        ...userData,
        name: name,
        age: age,
        gender: gender,
        profilePic: image,
      };
      onSave(updatedUserData);
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewImage(file);
      setImage(URL.createObjectURL(file));
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
        <div className="modal-box">
          <h3 className="font-semibold text-xl">Edit Profile</h3>
          <hr className="my-2" />
          <div className="mb-1 text-start flex flex-col">
            <label
              htmlFor="name"
              className="block text-black text-lg font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={userData.name}
              onChange={(e) => setName(e.target.value)}
              className="form-input w-full text-[16px] font-medium"
            />
          </div>
          <div className="mb-1 text-start flex flex-col">
            <label
              htmlFor="age"
              className="block text-black text-lg font-semibold mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              defaultValue={userData.age}
              onChange={(e) => setAge(e.target.value)}
              className="form-input w-full text-[16px] font-medium"
            />
          </div>
          <div className="mb-1 text-start flex flex-col">
            <label
              htmlFor="gender"
              className="block text-black text-lg font-semibold mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              defaultValue={userData.gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-input w-full text-[16px] font-medium"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-1 text-start flex flex-col">
            <label
              htmlFor="profile-pic"
              className="block text-black text-lg font-semibold mb-1"
            >
              Profile Picture
            </label>
            <img
              src={image}
              alt="Profile Pic"
              className="w-full mb-2 h-28 object-cover"
            />
            <input
              type="file"
              id="profile-pic"
              onChange={handleImageChange}
              className="form-input w-full"
            />
          </div>
          <div className="flex justify-evenly mt-5">
            <button
              className="btn bg-green-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg"
              onClick={handleSave}
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
      </div>
    </>
  );
};

export default ProfileModal;
