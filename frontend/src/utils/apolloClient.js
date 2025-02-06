import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ctf-questions.onrender.com/',
  cache: new InMemoryCache(),
});

export default client;
