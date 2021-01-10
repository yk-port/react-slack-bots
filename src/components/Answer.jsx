import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Answer = ({ content, nextId, select }) => {
  // const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => select(content, nextId)} >
      {content}
    </Button>
  )
}

export default Answer
