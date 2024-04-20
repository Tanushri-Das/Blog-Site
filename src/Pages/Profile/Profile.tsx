import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import ProfileModal from "./ProfileModal";
import "./Profile.css";

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
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl">User Profile</h3>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !userData && <div>No user data found</div>}
      {!isLoading && userData && (
        <div className="mt-10 table-container sm:mx-6 md:mx-8 lg:mx-20">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xl font-medium"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xl font-medium"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xl font-medium"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xl font-medium"
                >
                  Profile Pic
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xl font-medium"
                >
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
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium text-center">
                  <HiPencilSquare onClick={openModal} />
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
