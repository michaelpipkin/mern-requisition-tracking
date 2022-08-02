import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import EmployeeList from "./components/employee/employeeList";
import EditEmployee from "./components/employee/editEmployee";
import AddEmployee from "./components/employee/addEmployee";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<EmployeeList />} />
                <Route path="/editemployee/:id" element={<EditEmployee />} />
                <Route path="/addemployee" element={<AddEmployee />} />
            </Routes>
        </div>
    );
};

export default App;
