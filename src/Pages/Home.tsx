import React from "react";
import SideProfile from "../components/SideProfile";
import PostCreator from "../components/PostCreator";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="p-8 m-8 flex gap-4 w-[96.5%]">
        <SideProfile />
        <PostCreator />
      </div>
    </>
  );
};

export default Home;
