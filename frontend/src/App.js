import "./App.css";
//import ChatApp from "./components/Chat";
import React, { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Switch,
} from "react-router-dom";
import User from "./components/Users";
import Header from "./components/Headers";
import CreateUser from "./components/Users/create-user";
import CreateConversation from "./components/conversation/create-conversation";
import Conversation from "./components/conversation";
import ChatInConversation from "./components/Chat";
import axios from "axios";
import { apiURL } from './constant'

function App() {
    const [users, setUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        fetchUsers();
        fetchConversations();
    }, []);

    const fetchUsers = async () => {
        try {
          const apiResponse = await axios.get(`${apiURL}/user/get-user`);
          setUsers(apiResponse.data.listUser)
        } catch (error) {
          console.error('Error calling API:', error);
        }
      };

    const fetchConversations = async () => {
        try {
          const apiResponse = await axios.get(`${apiURL}/conversation/get-conversation`);
          setConversations(apiResponse.data.conversation)
        } catch (error) {
          console.error('Error calling API:', error);
        }
      };

    const handleUserCreated = () => {
        fetchUsers();
        fetchConversations();
    };


    return (
        <div className="App">
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<User users={users} />} />
                        <Route path="/create-user" element={<CreateUser onUserCreated={handleUserCreated} />} />
                        <Route path="/conversation/create-conversation" element={<CreateConversation />} />
                        <Route
                            path="/conversation"
                            element={
                                <Conversation users={users} conversation={conversations} />
                            }
                        />
                        <Route
                            path="/conversation/:id"
                            element={<ChatInConversation />}
                        />
                    </Routes>
                </div>
            </Router>
            {/*  <ChatApp /> */}
        </div>
    );
}

export default App;
