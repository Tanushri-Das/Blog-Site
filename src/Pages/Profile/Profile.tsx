import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import ProfileModal from "./ProfileModal";
import "./Profile.css";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem("personal-details");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
    setIsLoading(false);
  }, []);

  const handleSave = (updatedUserData: any) => {
    setUserData(updatedUserData);
    localStorage.setItem("personal-details", JSON.stringify(updatedUserData));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="my-20">
      <h1 className="text-black text-center text-3xl mb-6 font-bold">
        User Profile
      </h1>
      {isLoading && (
        <div className="flex justify-center mt-10">
          <CustomSpinner />
        </div>
      )}
      {!isLoading && !userData && (
        <div className="text-center mt-10">No user data found</div>
      )}
      {!isLoading && userData && (
        <div className="mt-10 table-container sm:mx-6 md:mx-8 lg:mx-20">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xl font-medium">Name</th>
                <th className="px-6 py-3 text-xl font-medium">Age</th>
                <th className="px-6 py-3 text-xl font-medium">Gender</th>
                <th className="px-6 py-3 text-xl font-medium">Profile Pic</th>
                <th className="px-6 py-3 text-xl font-medium">
                  Update Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  {userData.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  {userData.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  {userData.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  <img
                    src={userData.profilePic}
                    alt="Profile Pic"
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  <HiPencilSquare
                    onClick={openModal}
                    className="cursor-pointer mx-auto"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {modalIsOpen && userData && (
        <ProfileModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          onSave={handleSave}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Profile;
