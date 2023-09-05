import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: {processEnv},
} = getConfig();

let accessToken: string | null = null;

const httpLink = createHttpLink({
  uri: processEnv.NEXT_PUBLIC_API_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const res = await fetch(`${processEnv.NEXT_PUBLIC_APP_BASE_URL}/api/session`);

  const session = await res.json();

  accessToken = session.authorization;

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function setClientToken(newToken: string | null) {
  accessToken = newToken;
}

export function getToken() {
  return accessToken;
}

export default client;
