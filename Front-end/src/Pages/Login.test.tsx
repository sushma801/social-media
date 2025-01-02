import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import Login, { LOGGEDIN_USER } from "./Login";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

const mocks = [
  {
    request: {
      query: LOGGEDIN_USER,
      variables: { username: "testUser", password: "Test@1234" },
    },
    result: {
      data: {
        login: {
          id: "1",
          username: "testUser",
          email: "test@example.com",
          token: "abcd1234",
        },
      },
    },
  },
];

describe("Login Component", () => {
  it("renders the login form with all required fields", async () => {
    const { container } = await render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(container).toBeTruthy();
    const titleContainer = container.querySelector("div .cardTitle");
    const pageTitle = titleContainer.querySelector("h3");
    expect(pageTitle).toHaveTextContent("Login Page");
    const pageSubTitle = titleContainer.querySelector("h4");
    expect(pageSubTitle).toHaveTextContent("Welcome to the login Page");
    const loginForm = container.querySelector("div form");
    const inputField = loginForm?.querySelectorAll("input");
    expect(inputField).toHaveLength(2);
    fireEvent.change(inputField[0], { target: { value: "testUser" } });
    fireEvent.change(inputField[1], { target: { value: "Test@1234" } });
    const loginInput = loginForm?.querySelectorAll("button")[2];
    fireEvent.click(loginInput);
  });
});
