import react from "react";
import SignIn from "./pages/signin";
import Todo from "./pages/Todo";
import SignUp from "./pages/signup";
import { Route, Routes } from "react-router-dom";
const Routing = ()=>{
    return(
        <Routes>
            <Route path='/todo' element={<Todo/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    )
}

export default Routing;