/* eslint-disable no-undef */
import React from "react";
import Home from "../components/Home/Home";
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
describe("Test home component", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    mockedUseAuth.mockImplementation(() => ({ isLoading: true, data: "data" }));
    mockecdGetAuth.mockImplementation(
      jest.fn(() => ({
        onAuthStateChanged: { displayName: "mock", photoURL: "url" },
      }))
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Home when isLoading is true", async () => {
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    render(
      <MockAuthContext
        {...{ authState: { isLoading: true, error: null, data: null } }}
      >
        <Home {...{ user: { uid: '123123123'} }} />
      </MockAuthContext>
    );
    expect(screen.findAllByAltText("Cuentas disponibles")).toBeDefined();
    // expect(window.location.href).toEqual('')
  });
  it("Home when isLoading is false and error has values", () =>{
    
  })
});
