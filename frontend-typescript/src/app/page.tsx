"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/Users";
import CreateUser from "./components/Users/create-user";
import CreateConversation from "./components/conversation/create-conversation";
import Conversation from "./components/conversation";
import ChatInConversation from "./components/Chat";
import axios from "axios";
import { apiURL } from "../app/constants";

interface User {
    username: string;
    mobile: string;
}

interface Conversation {
    title: string;
}

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchConversations();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log("am I fetched");
            const apiResponse = await axios.get<{ listUser: User[] }>(
                `${apiURL}/user/get-user`
            );
            setUsers(apiResponse.data.listUser);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const fetchConversations = async () => {
        try {
            const apiResponse = await axios.get<{
                conversation: Conversation[];
            }>(`${apiURL}/conversation/get-conversation`);
            setConversations(apiResponse.data.conversation);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const handleUserCreated = () => {
        fetchUsers();
        fetchConversations();
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<User users={users} />} />
                        <Route
                            path="/create-user"
                            element={
                                <CreateUser
                                    onCreateUser={function (): void {
                                        throw new Error(
                                            "Function not implemented."
                                        );
                                    }}
                                />
                            }
                        />
                        <Route
                            path="/conversation/create-conversation"
                            element={
                                <CreateConversation
                                    onCreateUser={function (): void {
                                        throw new Error(
                                            "Function not implemented."
                                        );
                                    }}
                                />
                            }
                        />
                        <Route
                            path="/conversation"
                            element={
                                <Conversation
                                    users={users}
                                    conversation={conversations}
                                />
                            }
                        />
                        <Route
                            path="/conversation/:id"
                            element={<ChatInConversation />}
                        />
                    </Routes>
                </div>
            </Router>
        </main>
    );
}
