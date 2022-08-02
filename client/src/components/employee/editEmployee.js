import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        active: null,
        employees: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(
                `http://localhost:5000/employee/${params.id.toString()}`
            );

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Employee with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedEmployee = {
            firstName: form.firstName,
            lastName: form.lastName,
            active: form.active,
        };

        // This will send a put request to update the data in the database.
        await fetch(`http://localhost:5000/employee/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(editedEmployee),
            headers: {
                "Content-Type": "application/json",
            },
        });

        navigate("/");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Employee</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) =>
                            updateForm({ firstName: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) =>
                            updateForm({ lastName: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="active">Active</label>
                    <input
                        type="checkbox"
                        id="active"
                        value="Active"
                        defaultChecked={form.active}
                        onChange={(e) => updateForm({ active: e.target.value })}
                    />
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Employee"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
