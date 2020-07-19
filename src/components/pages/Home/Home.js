import React, { useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import SavedSeries from '../../SavedSeries/SavedSeries';

function Home(props) {
  const [count, setCount] = useState(0);

  return (
    <PageLayout hdgText="Home">
      HOME PAGE
      <SavedSeries />
    </PageLayout>
  );
}

export default Home;
