// import React, { useContext, useState } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";

// const PersonalDetails = () => {
//   const { authInfo } = useContext(AuthContext);
//   const user = authInfo ? authInfo.user : null;
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [profilePic, setProfilePic] = useState<File | null>(null);
//   console.log(user);
//   const img_hosting_token = "5a3c594cf3fbe5d54c7766406d0635b3";
//   const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";

//   const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProfilePic(e.target.files[0]);
//     }
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Prepare form data
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("age", age);
//     formData.append("gender", gender);
//     if (profilePic) {
//       formData.append("image", profilePic); // Appending only if profilePic is not null
//     }

//     // Send form data to server
//     fetch(img_hosting_url, {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((imgResponse) => {
//         console.log(imgResponse);
//         if (imgResponse.success) {
//           const imgURL = imgResponse.data.display_url;
//           // Retrieve user data from where it's stored (like localStorage)
//           console.log("userdata", name, age, gender, imgURL);
//           if (user) {
//             localStorage.setItem(
//               "personal-details",
//               JSON.stringify({
//                 uid: user.uid,
//                 email: user.email,
//                 name,
//                 age,
//                 gender,
//                 profilePic: imgURL,
//               })
//             );
//           }

//           // Show success message
//           Swal.fire({
//             title: "Good job!",
//             text: "Congratulations! Personal Details added Successfully!",
//             icon: "success",
//             timer: 1500,
//             showConfirmButton: false,
//           });
//           navigate(from, { replace: true });
//           // Clear form fields
//           setName("");
//           setAge("");
//           // No need to clear gender here
//           setProfilePic(null);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center my-16">
//       <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto">
//         <form className="form p-6 bg-white rounded-xl" onSubmit={onSubmit}>
//           <h1 className="text-black text-center text-3xl mb-6 font-bold">
//             Personal Details
//           </h1>
//           <div className="mb-3">
//             <label className="block text-black text-[16px] font-semibold mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//               className="form-input"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="block text-black text-[16px] font-semibold mb-1">
//               Age
//             </label>
//             <input
//               type="text"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               placeholder="Age"
//               className="form-input"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="block text-black text-[16px] font-semibold mb-1">
//               Gender
//             </label>
//             <div className="flex items-center space-x-5">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="male"
//                   onChange={(e) => setGender(e.target.value)}
//                   className="mt-[1px]"
//                 />
//                 <p className="ms-1">Male</p>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="female"
//                   onChange={(e) => setGender(e.target.value)}
//                   className="mt-[1px]"
//                 />
//                 <p className="ms-1">Female</p>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="others"
//                   onChange={(e) => setGender(e.target.value)}
//                   className="mt-[1px]"
//                 />
//                 <p className="ms-1">Others</p>
//               </div>
//             </div>
//           </div>
//           <div className="mb-3">
//             <label className="block text-black text-[16px] font-semibold mb-1">
//               Profile Pic
//             </label>
//             <input
//               type="file"
//               onChange={handleProfilePicChange}
//               className="form-input"
//             />
//           </div>
//           <div className="flex justify-center mt-4">
//             <button
//               type="submit"
//               className="login-btn text-[16px] font-semibold text-white"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const { authInfo } = useContext(AuthContext);
  const user = authInfo ? authInfo.user : null;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [profilePicError, setProfilePicError] = useState(false);
  console.log(user);
  const img_hosting_token = "5a3c594cf3fbe5d54c7766406d0635b3";
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous errors
    setNameError(false);
    setAgeError(false);
    setGenderError(false);
    setProfilePicError(false);

    // Check if any field is empty
    if (!name) {
      setNameError(true);
    }
    if (!age) {
      setAgeError(true);
    }
    if (!gender) {
      setGenderError(true);
    }
    if (!profilePic) {
      setProfilePicError(true);
    }

    // If any field is empty, prevent form submission
    if (!name || !age || !gender || !profilePic) {
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    if (profilePic) {
      formData.append("image", profilePic); // Appending only if profilePic is not null
    }

    // Send form data to server
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          // Retrieve user data from where it's stored (like localStorage)
          console.log("userdata", name, age, gender, imgURL);
          if (user) {
            localStorage.setItem(
              "personal-details",
              JSON.stringify({
                uid: user.uid,
                email: user.email,
                name,
                age,
                gender,
                profilePic: imgURL,
              })
            );
          }

          // Show success message
          console.log("Submission successful");
          navigate(from, { replace: true });
          // Clear form fields
          setName("");
          setAge("");
          // No need to clear gender here
          setProfilePic(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center my-16">
      <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto">
        <form className="form p-6 bg-white rounded-xl" onSubmit={onSubmit}>
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Personal Details
          </h1>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-input"
            />
            {nameError && <p className="text-red-600 mt-1">Name is required</p>}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Age
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="form-input"
            />
            {ageError && <p className="text-red-600 mt-1">Age is required</p>}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Gender
            </label>
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-[1px]"
                />
                <p className="ms-1">Male</p>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-[1px]"
                />
                <p className="ms-1">Female</p>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-[1px]"
                />
                <p className="ms-1">Others</p>
              </div>
            </div>
            {genderError && (
              <p className="text-red-600 mt-1"> Gender is required</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Profile Pic
            </label>
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="form-input"
            />
            {profilePicError && (
              <p className="text-red-600 mt-1">Profile pic is required</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="login-btn text-[16px] font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;