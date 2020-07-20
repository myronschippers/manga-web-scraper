import React, { useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import SavedSeries from '../../SavedSeries/SavedSeries';

function Home(props) {
  const [count, setCount] = useState(0);

  return (
    <PageLayout hdgText="Home">
      <SavedSeries />
    </PageLayout>
  );
}

export default Home;
