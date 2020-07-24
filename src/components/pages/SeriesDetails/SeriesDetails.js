import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// MATERIAL-UI COMPONENTS
import {
  Grid,
  Typography,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import PageLayout from '../PageLayout/PageLayout';

function SeriesDetails (props) {
  const seriesId = parseInt(props.match.params.id);
  console.log('seriesId: ', seriesId);

  // functional component equivalent of componentDidMount
  useEffect(() => {
    // FETCH single series details
    if (seriesId !== props.store.seriesDetails.id) {
      props.dispatch({
        type: 'API_FETCH_SERIES_DETAILS',
        payload: { seriesId },
      });
    }
  });

  const chaptersListView = props.store.seriesDetails.chapters.map(item => {
    return (
      <li key={item.id}>
        <strong>{item.name}</strong> {item.title}
        <p>{item.path}</p>
      </li>
    )
  });

  return (
    <PageLayout hdgText={props.store.seriesDetails.title}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h5" component="h3">
            Details:
          </Typography>
          <img
            src={props.store.seriesDetails.thumbnail}
            alt={props.store.seriesDetails.title}
          />
          <Typography variant="h6" component="h4">
            Author: {props.store.seriesDetails.author}
          </Typography>
          <Typography variant="h6" component="h4">
            Description:
          </Typography>
          <Typography variant="body1" component="p">
            {props.store.seriesDetails.description ?
              props.store.seriesDetails.description :
              'There is no description available.'
            }
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="h3">
            Chapters:
          </Typography>
          <ul>
            {chaptersListView.length !== 0 ?
              chaptersListView :
              <li>No chapters fetched at this time.</li>
            }
          </ul>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default connect(mapStoreToProps('seriesDetails'))(SeriesDetails);
