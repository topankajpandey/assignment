import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from '../../constant'

const CreateConversation = ({ onCreateUser }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [conversationData, setConversationData] = useState({title: ""});

    

    const handleChange = (e) => {
        setConversationData({ ...conversationData, title: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiURL}/conversation/create-conversation`, conversationData);
            setConversationData({ title: ""});
          } catch (error) {
            console.error('Error creating user:', error);
          }
        navigate("/conversation");
    };

    const homeHandler = (e) => {
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
                    <h2>Create- New Conversation</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group m-2">
                            <label htmlFor="title">title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={conversationData.title}
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

export default CreateConversation;
