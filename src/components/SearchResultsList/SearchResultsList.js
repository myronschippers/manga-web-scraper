import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Grid,
  Button,
  LinearProgress,
} from '@material-ui/core';

class SearchResultsList extends Component {
  render() {
    const resultsElements = this.props.store.results.map((item, index) => {
      return (
        <Grid item xs={4} key={index}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
            </Grid>
            <Grid item xs={5}>
              <h3>{item.title}</h3>
              <a href={item.path}>Go To Series</a>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained">Save Series</Button>
            </Grid>
          </Grid>
        </Grid>
      );
    });
    const loadingSearchResults = (
      <Grid container spacing={3}>
        <Grid item xs={12}><LinearProgress color="secondary" /></Grid>
      </Grid>
    );
    const resultsContainer = this.props.store.results.length > 0 ? (
      <Grid container spacing={3}>
        {resultsElements}
      </Grid>
    ) :
    (
      <Grid container spacing={3}>
        <Grid item xs={12}>There are no results at this time.</Grid>
      </Grid>
    );

    return (
      <div>
        <h2>RESULTS:</h2>

        {this.props.store.searchLoading ?
          loadingSearchResults :
          resultsContainer
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SearchResultsList);
