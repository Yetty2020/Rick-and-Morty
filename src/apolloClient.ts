
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
// import {
//   CombinedGraphQLErrors,
//   CombinedProtocolErrors,
//   LocalStateError,
//   ServerError,
//   ServerParseError,
//   UnconventionalError,
// } from "@apollo/client/errors";
//import { onError } from '@apollo/client/link/error';
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   // Handle GraphQL-specific errors (e.g., validation, resolver errors)
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       console.error(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });
//   }

  // Handle network-level errors (e.g., connection issues)
//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
//   }
// });




// // Comprehensive error handling example.
//  function handleError(error: unknown) {
//   if (CombinedGraphQLErrors.is(error)) {
//     // Handle GraphQL errors
//   } else if (CombinedProtocolErrors.is(error)) {
//     // Handle multipart subscription protocol errors
//   } else if (LocalStateError.is(error)) {
//     // Handle errors thrown by the `LocalState` class
//   } else if (ServerError.is(error)) {
//     // Handle server HTTP errors
//   } else if (ServerParseError.is(error)) {
//     // Handle JSON parse errors
//   } else if (UnconventionalError.is(error)) {
//     // Handle errors thrown by irregular types
//   } else {
//     // Handle other errors
//   }
// }


const httpLink = new HttpLink({
    uri: import.meta.env.VITE_RICK_AND_MORTY_API_URL,
});

const link = ApolloLink.from([httpLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            characters: {
              keyArgs: ["filter"],
              merge(existing, incoming){
                return {
                  ...incoming,
                  results: [
                    ...(existing?.results || []),
                    ...incoming.results
                  ],
                }
              }
            }
          }
        }
      }
    }),
});
export default client
