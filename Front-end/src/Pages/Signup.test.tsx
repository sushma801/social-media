import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import { useRegister } from "../hooks/useRegister";

vi.mock("../hooks/useRegister", () => ({
  useRegister: vi.fn(),
}));

describe("Signup Component", () => {
  let mockRegisterUser: vi.Mock;

  beforeEach(() => {
    mockRegisterUser = vi.fn();
    (useRegister as vi.Mock).mockReturnValue({
      registerUser: mockRegisterUser,
    });
  });

  it("renders the signup form with all required fields", async () => {
    const { container } = render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();

    const pageTitle = container.querySelector("div div h3");
    expect(pageTitle).toHaveTextContent("Sign Up Page");
    const signupForm = container.querySelector("div form");
    const checkAllLabel = signupForm.querySelectorAll("label");
    expect(checkAllLabel).toHaveLength(5);
    const inputFields = signupForm?.querySelectorAll("input");
    fireEvent.change(inputFields[0], {
      target: { value: "testuser" },
    });
    fireEvent.change(inputFields[1], {
      target: { value: "test@example.com" },
    });
    fireEvent.change(inputFields[2], {
      target: { value: "Test User" },
    });
    fireEvent.change(inputFields[3], {
      target: { value: "Test@1234" },
    });
    fireEvent.change(inputFields[4], {
      target: { value: "Test@1234" },
    });

    const signUpBtn = signupForm.querySelectorAll("button");

    fireEvent.click(signUpBtn[3]);

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        fullname: "Test User",
        password: "Test@1234",
        confirmPassword: "Test@1234",
      });
    });
  });
});
