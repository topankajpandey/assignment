import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from '../../../app/constants';

interface CreateConversationProps {
  onCreateUser: () => void;
}

const CreateConversation: React.FC<CreateConversationProps> = ({ onCreateUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [conversationData, setConversationData] = useState<{ title: string }>({ title: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConversationData({ ...conversationData, title: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/conversation/create-conversation`, conversationData);
      setConversationData({ title: "" });
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
    navigate("/conversation");
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
          <h2>Create New Conversation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group m-2">
              <label htmlFor="title">Title:</label>
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
              Create Conversation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateConversation;
