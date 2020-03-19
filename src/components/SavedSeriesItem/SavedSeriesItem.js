import React from 'react';

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
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
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

  return (
    <Card className={classes.root}>
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

export default SavedSeriesItem;
