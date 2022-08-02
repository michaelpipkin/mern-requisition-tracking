import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = (props) => (
    <tr>
        <td>{props.employee.firstName}</td>
        <td>{props.employee.lastName}</td>
        <td>{props.employee.active}</td>
        <td>
            <Link
                classfirstName="btn btn-link"
                to={`/edit/${props.employee._id}`}
            >
                Edit
            </Link>{" "}
            |
            <button
                classfirstName="btn btn-link"
                onClick={() => {
                    props.deleteEmployee(props.employee._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    // This method fetches the Employees from the database.
    useEffect(() => {
        async function getEmployees() {
            const response = await fetch(`http://localhost:5000/employee/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const employees = await response.json();
            setEmployees(employees);
        }

        getEmployees();

        return;
    }, [employees.length]);

    // This method will delete a Employee
    async function deleteEmployee(id) {
        await fetch(`http://localhost:5000/employee/${id}`, {
            method: "DELETE",
        });

        const newEmployees = employees.filter((el) => el._id !== id);
        setEmployees(newEmployees);
    }

    // This method will map out the Employees on the table
    function employeeList() {
        return employees.map((employee) => {
            return (
                <Employee
                    employee={employee}
                    deleteEmployee={() => deleteEmployee(employee._id)}
                    key={employee._id}
                />
            );
        });
    }

    // This following section will display the table with the Employees of individuals.
    return (
        <div>
            <h3>Employee List</h3>
            <table
                classfirstName="table table-striped"
                style={{ marginTop: 20 }}
            >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{employeeList()}</tbody>
            </table>
        </div>
    );
}
