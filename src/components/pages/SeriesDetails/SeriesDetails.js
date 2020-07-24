import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// MATERIAL-UI COMPONENTS
import {
  Grid,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import PageLayout from '../PageLayout/PageLayout';

function SeriesDetails (props) {
  const [count, setCount] = useState(0);
  const seriesId = props.match.params.id;
  console.log('seriesId: ', seriesId);

  // functional component equivalent of componentDidMount
  useEffect(() => {
    // FETCH all chapters for series
    // props.dispatch({
    //   type: 'API_FETCH_SERIES_CHAPTERS',
    //   payload: { seriesId },
    // });

    // FETCH single series details
    props.dispatch({
      type: 'API_FETCH_SERIES_DETAILS',
      payload: { seriesId },
    });
  });

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

export default connect()(SeriesDetails);
