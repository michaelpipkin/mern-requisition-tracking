import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AddEmployee() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        active: true,
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newEmployee = { ...form };

        await fetch("http://localhost:5000/employee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
        }).catch((error) => {
            window.alert(error);
            return;
        });

        setForm({ firstName: "", lastName: "", active: true });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>AddEmployee New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
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
                    <label htmlFor="lastName">Last Name</label>
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
                        className="form-control"
                        id="active"
                        value={form.active}
                        onChange={(e) => updateForm({ active: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="AddEmployee person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
