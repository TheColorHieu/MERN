import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//establish a new link to the GraphQL server at its /graphql endpoint using createHttpLink.
const httpLink = createHttpLink({
  uri: '/graphql',
});

//create a new middleware function to retrieve the token from localStorage and set the HTTP request headers of every request to include the token.
const authLink = setContext((_, { headers }) => {
  //get the token value from localStorage
  const token = localStorage.getItem('id_token');
  //return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//instantiate the Apollo Client instance by passing in the authLink and httpLink.
const client = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache(),
});


function App() {
  return (
    //wrap the entire application in the ApolloProvider component and pass in the client variable as the value for the client prop.
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
