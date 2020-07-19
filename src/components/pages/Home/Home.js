import React, { useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';

function Home(props) {
  const [count, setCount] = useState(0);

  return (
    <PageLayout hdgText="Home">
      HOME PAGE
    </PageLayout>
  );
}

export default Home;
