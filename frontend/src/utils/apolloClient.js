import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://kjsse-ctf-2025.onrender.com/',
  cache: new InMemoryCache(),
});

export default client;
