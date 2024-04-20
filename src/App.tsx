import { Routes, Route } from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PersonalDetails from "./Pages/PersonalDetails/PersonalDetails";
import CreateBlogs from "./Pages/CreateBlogs/CreateBlogs";

const App = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/create-blogs" element={<CreateBlogs />} />
      </Routes>
    </Main>
  );
};

export default App;
