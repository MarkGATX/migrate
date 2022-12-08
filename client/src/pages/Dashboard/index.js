import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const Dashboard = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  
  // Store search history in local storage
  const [showSearchHistory, setShowSearchHistory] = useState(true);

  // Get search history from local storage and set to state
  useEffect(() => {
    const data = window.localStorage.getItem('Search History');
    if (data !== null) {
      setShowSearchHistory(JSON.parse(data));
  }}, []);

  // Set search history in local storage when state changes
  useEffect(() => {
    window.localStorage.setItem('Search History', JSON.stringify(showSearchHistory))
  }, [showSearchHistory]);

  let lastSearch = searchHistory[searchHistory.length - 1];
	// render movie posters of stored movies to the DOM
	if(searchHistory) { 
		for (var i = 0; i < 3; i++) {
		const searchHistoryContent = 
    }}
  // navigate to personal profile page if username matches param
  if (Auth.loggedIn() && Auth.getDashboard().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Welcome {userParam ? `back, ${user.username}!` : 'Welcome!'} Continue where you left off..
        </h2>
        <div>
{     searchHistoryContent}
  </div>
        <div>
         
        </div>
        {!userParam && (
          <div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
