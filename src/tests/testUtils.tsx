import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {store} from "../store/store.tsx";
import {setContext} from "@apollo/client/link/context";
import {Provider} from "react-redux";

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  const getApolloClient = () => {
    const httpLink = createHttpLink({
      uri: "https://api.github.com/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer `, //add your key here
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };

  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {children}
      </Provider>
    </ApolloProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}