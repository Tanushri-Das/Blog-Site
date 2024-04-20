import { Routes, Route } from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PersonalDetails from "./Pages/PersonalDetails/PersonalDetails";
import CreateBlogs from "./Pages/CreateBlogs/CreateBlogs";
import AllBlogs from "./Pages/AllBlogs/AllBlogs";
import Profile from "./Pages/Profile/Profile";

const App = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/create-blogs" element={<CreateBlogs />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Main>
  );
};

export default App;
