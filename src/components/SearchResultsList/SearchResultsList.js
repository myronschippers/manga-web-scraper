import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Grid,
  Button,
  LinearProgress,
} from '@material-ui/core';
import SearchResultsItem from '../SearchResultsItem/SearchResultsItem';

class SearchResultsList extends Component {
  render() {
    const resultsElements = this.props.store.results.map((item, index) => {
      return (
        <SearchResultsItem item={item} key={index} />
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
