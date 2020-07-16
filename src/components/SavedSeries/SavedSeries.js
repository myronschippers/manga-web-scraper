import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Grid,
} from '@material-ui/core';

import SavedSeriesItem from '../SavedSeriesItem/SavedSeriesItem';

class SavedSeries extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'API_FETCH_SERIES'
    });
  }

  render() {
    const seriesElemList = this.props.store.series.map((item, index) => {
      return (
        <Grid item xs={4} key={index}>
          <SavedSeriesItem item={item} />
        </Grid>
      );
    });

    const savedSeriesList = (
      <Grid container spacing={3} alignItems="stretch">
        {seriesElemList}
      </Grid>
    );

    const nothingSavedMsg = <p>There are currently no saved series.</p>;

    return (
      <div>
        {this.props.store.series.length === 0 ?
            nothingSavedMsg :
            savedSeriesList}
      </div>
    );
  }
}

export default connect(mapStoreToProps('series'))(SavedSeries);
