import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Grid,
  Button,
} from '@material-ui/core';

class SavedSeries extends Component {
  render() {
    const seriesElemList = this.props.store.series.map((item, index) => {
      return (
        <Grid item xs={2}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
            </Grid>
            <Grid item xs={5}>
              <h3>{item.title}</h3>
              <a href={item.path}>Go To Series</a>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={this.saveSeries}>Save Series</Button>
            </Grid>
          </Grid>
        </Grid>
      );
    });

    const savedSeriesList = (
      <Grid container spacing={3}>
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

export default connect(mapStoreToProps)(SavedSeries);
