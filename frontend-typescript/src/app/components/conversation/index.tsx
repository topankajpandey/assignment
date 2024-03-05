import React, { useState, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./../../../app/constants"
import Header from "../Headers";

interface ConversationProps {
  conversation: Array<{ title: string }>;
  users: Array<{ mobile: string; username: string }>;
}

const Conversation: React.FC<ConversationProps> = (props) => {
  const navigate = useNavigate();
  const { conversation, users } = props;
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [conversationData, setConversationData] = useState<{ userId?: string; conversationId?: string }>({});
  const location = useLocation();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, title: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [title]: event.target.value,
    });
    const conversationData = {
      userId: event.target.value,
      conversationId: title,
    };
    setConversationData(conversationData);
  };

  const conversationHandler = () => {
    navigate(`/conversation/create-conversation`);
  };

  const joinConversation = async (title: string) => {
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
                      <select
                        value={selectedOptions[conv.title] || ''}
                        onChange={(event) => handleSelectChange(event, conv.title)}
                      >
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
