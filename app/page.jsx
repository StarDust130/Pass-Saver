"use client";
import { useState } from "react";
import AddData from "./components/AddData";
import Header from "./components/Header";
import List from "./components/List";
const Home = () => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <>
      <Header setShowAdd={setShowAdd} showAdd={showAdd} />

      <List />
      {showAdd && <AddData setShowAdd={setShowAdd} />}
    </>
  );
};
export default Home;
