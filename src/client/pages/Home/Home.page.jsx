import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

// import style
import useStyles from "./home.style";

const Home = ({ history }) => {
  const classes = useStyles();

  const onCreateClick = (e) => history.push("/relations");

  const onFindClick = (e) => history.push("/find");

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} className={classes.heading}>
        <Typography variant="h1" color="primary">
          Welcome
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" color="primary" align="center">
          THIS IS A WEBSITE WHERE YOU CAN CREATE RELATIONS BETWEEN TWO PEOPLE.
          YOU CAN UPDATE THE TYPE OF RELATION THAT THEY HAVE IN BETWEEN. YOU CAN
          FIND ALL POSSIBLE DEGREE OF RELATIONSHIP BETWEEN ANY TWO PEOPLE.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.details}>
          <Button variant="contained" color="inherit" onClick={onCreateClick}>
            CREATE RELATIONS
          </Button>
        </Grid>

        <Grid className={classes.details}>
          <Button variant="contained" color="inherit" onClick={onFindClick}>
            FIND RELATIONS
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
