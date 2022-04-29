/* eslint-disable no-undef */
import React from "react";
import Navbar from "../components/Navbar/navbar";
import { MockAuthContext } from "../__mocks__/authContext";
import { render, screen } from "@testing-library/react";
import { useAuth } from "../utils/Auth/use-auth";
import { getAuth } from "firebase/auth";
import { afterEach, beforeEach, describe, it } from "@jest/globals";
import { QueryClientProvider, QueryClient } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import UseProvideAuth from "../utils/Auth/auth-provider";

const mockedUseAuth = useAuth;
const mockecdGetAuth = getAuth;
// Mock the module
jest.mock("../utils/Auth/use-auth");
jest.mock("../utils/Auth/auth-provider");
jest.mock("firebase/auth");
const mockLogout = jest.fn();
describe("Navbar", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    mockedUseAuth.mockImplementation(() => ({ isLoading: true }));
    mockecdGetAuth.mockImplementation(
      jest.fn(() => ({
        onAuthStateChanged: { displayName: "mock", photoURL: "url" },
      }))
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Navbar", async () => {
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    render(
      <MockAuthContext
        {...{ authState: { isLoading: true, error: null, data: null } }}
      >
        <Navbar {...{ handleLogout: mockLogout }} />
      </MockAuthContext>
    );
    expect(screen.findAllByAltText("Money Balance")).toBeDefined();
  });
});
