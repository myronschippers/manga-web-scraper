import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#252b52',
    borderRadius: '0 0 5px 5px',
    borderTop: '3px solid #425dd0',
    boxShadow: '0 6px 4px rgb(0,0,0, 0.4)',
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: '75%',
    boxSizing: 'border-box',
  },
  cover: {
    width: '25%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function SavedSeriesItem(props) {
  const classes = useStyles();
  const {
    item
  } = props;

  function clickToDetails() {
    props.history.push(`/series-details/${props.item.id}`);
  }

  return (
    <Card onClick={clickToDetails} className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.author}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          Additional Information
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={item.thumbnail}
        title="Live from space album cover"
      />
    </Card>
  );
}

export default withRouter(SavedSeriesItem);
