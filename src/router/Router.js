import react from "react";
import SignIn from "../pages/signin";
import Todo from "../pages/Todo";
import SignUp from "../pages/signup";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
};

export default Router;
