import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="my-20">
      <h1 className="text-black text-center text-4xl mb-8 font-bold">
        Welcome to my Blog Website
      </h1>
      <p className="text-black text-center text-xl mb-6 font-medium">
        Can you add blog ? Please click this button
      </p>
      <div className="flex justify-center items-center">
        <Link to="/create-blogs">
          <button className="login-btn text-lg font-semibold text-white px-8 py-3">
            Create Blogs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
