import react from "react";
import SignIn from "../pages/signin";
import Todo from "../pages/Todo";
import SignUp from "../pages/signup";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
const Router = () => {
  
  const state= useSelector(state=>state)
  // console.log(state,'state');
  // console.log('first',state?.loginUser.userData.userId);
  // )
  return (
      <Routes>
    {state?.loginUser?.userData?.userId ? ( 
        <>
        <Route path="/todo" element={<Todo />} />
        <Route path="/*" element={<Todo />} />
        </>
    ) : (<>
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<SignIn />} />
        <Route path="/signup" element = {<SignUp/>}/>
    </>
        )}
        </Routes>
    // <Routes>
    //   <Route path="/" element={< SignIn />} />
    //   <Route path="/todo" element={<Protected Component = {Todo} />} />
    //   <Route path="/signup" element={<SignUp />} />
    //   <Route path="*" element={<SignIn />} />
    // </Routes>
  );
};

export default Router;
