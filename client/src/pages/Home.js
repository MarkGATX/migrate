import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COUNTRIES } from '../utils/queries';

import CountryList from '../components/CountryList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_COUNTRIES);
  const countries = data?.countries || [];

  const firstTenCountries = countries.slice(0, 10);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CountryList
              countries={firstTenCountries}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;