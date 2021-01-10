import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Answer = ({ content }) => {
  // const classes = useStyles();

  return (
    <Button variant="contained">
      {content}
    </Button>
  )
}

export default Answer
