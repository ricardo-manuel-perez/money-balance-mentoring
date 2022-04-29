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
import {createMemoryHistory} from 'history';

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
  });it("1. Home render test", async () => {
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    render(
      <MockAuthContext
        {...{ authState: { isLoading: true, error: null, data: null } }}
      >
        <Home {...{ accountsStateParam: [], history: "history" }} />
      </MockAuthContext>
    );
    const accountsElement = screen.queryByText("Cuentas disponibles");
    expect(accountsElement).toBeInTheDocument();
  });
  it("2. Home when acounts is empty", async () => {
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    render(
      <MockAuthContext
        {...{ authState: { isLoading: true, error: null, data: null } }}
      >
        <Home {...{ accountsStateParam: [], history: "history" }} />
      </MockAuthContext>
    );
    const detailsElement = screen.queryByText("Detalles");
    expect(detailsElement).toBeNull();
  });
  it("3. Home when when accounts is not empty", async () =>{
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    render(
      <MockAuthContext
        {...{ authState: { isLoading: false, error: {code: 404, message :'Not found'}, data: null } }}
      >
        <Home {...{ accountsStateParam: [{'name': 'test'}], history: "history" }} />
      </MockAuthContext>
    );
    const detailsElement = screen.getByText("Detalles");
    expect(detailsElement).toBeInTheDocument();
  });
  it("4. Home test go to transactions button", async () =>{
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    const { container } = render(
      <MockAuthContext
        {...{ authState: { isLoading: false, error: {code: 404, message :'Not found'}, data: null } }}
      >
        <Home {...{ accountsStateParam: [{name: 'test', id: "1"}], history: history} }/>
      </MockAuthContext>
    );
    const button = container.querySelector('#go-to-transaction');
    button.click();
    expect(pushSpy).toHaveBeenCalledWith('/accounts/1/transactions');
  });
  it("5. Home test accounts lenght equal 4", async () =>{
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    const { container } = render(
      <MockAuthContext
        {...{ authState: { isLoading: false, error: {code: 404, message :'Not found'}, data: null } }}
      >
        <Home {...{ accountsStateParam: [{name: 'test', id: "1"}, {name: 'test 2', id: "2"}, {name: 'test 3', id: "3"}, {name: 'test 4', id: "4"}], history: "history"} }/>
      </MockAuthContext>
    );
    let cards = container.querySelectorAll('#account-card');
    expect(cards.length).toBe(4);
  });
  it("6. Home test delete an account", async () =>{
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    const { container } = render(
      <MockAuthContext
        {...{ authState: { isLoading: false, error: {code: 404, message :'Not found'}, data: null } }}
      >
        <Home {...{ accountsStateParam: [{name: 'test', id: "1"}, {name: 'test 2', id: "2"}, {name: 'test 3', id: "3"}], history: "history"} }/>
      </MockAuthContext>
    );
    let cards = container.querySelectorAll('#account-card');
    expect(cards.length).toBe(3);
    const button = container.querySelector('#delete-account');
    button.click();
    cards = container.querySelectorAll('#account-card');
    expect(cards.length).toBe(2);
  });
  it("7. Home test delete all acounts", async () =>{
    const { result, waitFor } = renderHook(() => UseProvideAuth(), { wrapper });
    await waitFor(() => result);
    const { container } = render(
      <MockAuthContext
        {...{ authState: { isLoading: false, error: {code: 404, message :'Not found'}, data: null } }}
      >
        <Home {...{ accountsStateParam: [{name: 'test', id: "1"}, {name: 'test 2', id: "2"}, {name: 'test 3', id: "3"}], history: "history"} }/>
      </MockAuthContext>
    );
    let detailsElementLength = screen.queryAllByText("Detalles").length;
    expect(detailsElementLength).toBe(3);
    let cardLength = container.querySelectorAll('#account-card').length;
    expect(cardLength).toBe(3);
    let button = container.querySelector('#delete-account');
    button.click();
    button = container.querySelector('#delete-account');
    button.click();
    button = container.querySelector('#delete-account');
    button.click();
    cardLength = container.querySelectorAll('#account-card').length;
    expect(cardLength).toBe(0);
    detailsElementLength = screen.queryAllByText("Detalles").length;
    expect(detailsElementLength).toBe(0);
  });
});
