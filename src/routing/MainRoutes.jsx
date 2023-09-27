import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import ListAllUsers from "../pages/ListAllUsers";
import CreateTicket from "../pages/tickets/CreateTicket";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ticket/create" element={<CreateTicket />} />
      <Route element={<AuthRoutes allowListedRoles={["admin"]} />}>
        <Route path="/users" element={<ListAllUsers />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
export default MainRoutes;
