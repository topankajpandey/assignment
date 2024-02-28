import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Link,
    useNavigate,
    useLocation,
} from "react-router-dom";
import axios from "axios";
import { apiURL } from '../../constant'
import Header from "../Headers";

const Conversation = (props) => {

    const navigate = useNavigate();
    const { conversation, users } = props;
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [conversationData, setConversationData] = useState({});
    const location = useLocation();

    const handleSelectChange = async (event, title) => {
        setSelectedOptions({
            ...selectedOptions,
            [title]: event.target.value,
        });
        const conversationData = {
            userId: event.target.value,
            conversationId: title
        }
        setConversationData(conversationData)        
    };

    const conversationHandler = () => {
        navigate(`/conversation/create-conversation`);
    };

    const joinConversation = async (title) => {
        try {
            await axios.post(`${apiURL}/conversation/join-conversation`, conversationData);
            navigate(`/conversation/${title}?userId=${conversationData.userId}&conversationId=${conversationData.conversationId}`);
          } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const homeHandler = () => {
        navigate("/");
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <button
                                style={{
                                    display:
                                        location.pathname === "/"
                                            ? "none"
                                            : "block",
                                }}
                                className="btn btn-primary ml-auto"
                                onClick={homeHandler}
                            >
                                Home
                            </button>
                            <button
                                className="btn btn-primary ml-auto m-1"
                                onClick={conversationHandler}
                            >
                                Create Conversation
                            </button>
                        </nav>
                        
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Users</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conversation.map((conv) => (
                                    <tr key={conv.title}>
                                        <td>{conv.title}</td>
                                        <td>
                                        <select value={selectedOptions[conv.title] || ''} onChange={(event) => handleSelectChange(event, conv.title)}>
                                            <option value="" disabled>Select an option</option>
                                            {users.map((option) => (
                                            <option key={option.mobile} value={option.mobile}>
                                                {option.username}
                                            </option>
                                            ))}
                                        </select>
                                        </td>
                                        <td>
                                            {selectedOptions[conv.title] && (
                                                <button
                                                    className="btn btn-primary ml-auto"
                                                    onClick={() => joinConversation(conv.title.toLowerCase())}
                                                >
                                                    Join Conversation
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Conversation;
