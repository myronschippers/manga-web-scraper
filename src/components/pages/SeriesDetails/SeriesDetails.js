import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
  Grid,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import PageLayout from '../PageLayout/PageLayout';

function SeriesDetails (props) {
  const [count, setCount] = useState(0);
  const seriesId = this.props.match.params.id;
  console.log('seriesId: ', seriesId);

  return (
    <PageLayout hdgText="Series Details">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          IMG
          <p>Details</p>
        </Grid>
        <Grid item xs={8}>
          <h3>Chapters</h3>
          <ul>
            <li>Chapter Item</li>
            <li>Chapter Item</li>
            <li>Chapter Item</li>
          </ul>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default SeriesDetails;
