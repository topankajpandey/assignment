"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./../../../app/constants";

interface UserData {
    username: string;
    mobile: string;
}

interface CreateUserProps {
    onCreateUser: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onCreateUser }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        username: "",
        mobile: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${apiURL}/user/create-user`,
                userData
            );
            setUserData({ username: "", mobile: "" });
            onCreateUser();
            navigate("/");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const homeHandler = () => {
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button
                            className="btn btn-primary ml-auto"
                            onClick={homeHandler}
                        >
                            Home
                        </button>
                    </nav>
                    <h2>Create- New User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group m-2">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="mobile">Mobile:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                value={userData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary m-2">
                            Create User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
