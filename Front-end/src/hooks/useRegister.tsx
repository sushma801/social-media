import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/UserSlice";

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [addUser, { data }] = useMutation(REGISTER_USER);
  const registerUser = async ({
    username,
    fullname,
    email,
    password,
    confirmPassword,
  }) => {
    setLoading(true);
    try {
      const res = await addUser({
        variables: { username, fullname, email, password, confirmPassword },
      });
      if (res) {
        localStorage.setItem("authUser", JSON.stringify(res.data.register));
        localStorage.setItem("token", JSON.stringify(res.data.register.token));
        dispatch(setAuthUser(res.data.register));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return { loading, status, registerUser };
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $fullname: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        fullname: $fullname
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
