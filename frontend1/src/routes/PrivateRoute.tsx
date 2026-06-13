import {Navigate} from "react-router-dom";
import React from "react";

 function privateRoute({children, }:{children : React.ReactNode}){
     const token = localStorage.getItem("token");

     return token?children : <Navigate to="/login"/>
 }
 export default privateRoute;