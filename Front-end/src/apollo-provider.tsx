import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const removeComma = (token) => {
  return token.substring(1, token.length - 1);
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage?.getItem("token");

  let newToken = "";
  if (token) {
    newToken = removeComma(token);
  }

  // const authUser = localStorage.getItem('authUser');
  return {
    headers: {
      ...headers,
      authorization: newToken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
