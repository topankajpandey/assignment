import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Page from "./page";
import React from "react";

jest.mock("axios");

describe("Home component", () => {
    test("fetches users and conversations on mount", async () => {
        const mockUsers = [{ id: 1, name: "John" }];
        const mockConversations = [{ id: 1, title: "Conversation 1" }];

        //const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
        const mockedGet = axios.get as jest.Mock;

        mockedGet.mockResolvedValueOnce({
            data: { listUser: mockUsers },
        });

        mockedGet.mockResolvedValueOnce({
            data: { conversation: mockConversations },
        });

        const { getByText } = render(
            <MemoryRouter>
                <Page />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(getByText("John") as HTMLElement).toBeInTheDocument();
            expect(
                getByText("Conversation 1") as HTMLElement
            ).toBeInTheDocument();
        });
    });
});
