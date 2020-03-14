import React, { Component } from 'react';

import {
  Grid,
  Button,
} from '@material-ui/core';

class SearchResultsItem extends Component {
  render() {
    const {
      item,
    } = this.props;

    return (
      <Grid item xs={4}>
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
  }
}

export default SearchResultsItem;
