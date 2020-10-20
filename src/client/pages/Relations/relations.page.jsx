import React, { useState, Fragment, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { SET_DATA } from "../../redux/actions/user.actions";

// components
import SearchName from "../../components/SearchName/Search.relations";
import RelationList from "../../components/RelationList/List.relation";
import AddRelation from "../../components/AddRelation/Add.relation";

// styles
import useStyles from "./relations.style";

const Relations = ({ data, setData, index }) => {
  const classes = useStyles();

  const [flag, setFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (index !== -1) {
      setIsOpen(true);
    }
  }, [index]);

  const onClickHandler = (e) => {
    setIsOpen(true);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={!flag ? 12 : 6}>
          <div className={classes.main}>
            <SearchName setData={setData} setFlag={setFlag} />
            <Typography variant="h6" color="primary" className={classes.item}>
              OR
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              className={classes.item}
              onClick={onClickHandler}
            >
              CREATE RELATIONS
            </Button>
          </div>
        </Grid>
        {!!flag && (
          <Grid item xs={12} md={6} className={classes.list}>
            <RelationList
              list={data.list}
              relations={data.relations}
              name={data.name}
              setIsOpen={setIsOpen}
            />
          </Grid>
        )}
      </Grid>
      <AddRelation isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.userData,
    index: state.list,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    setData: (data) =>
      dispatch({
        type: SET_DATA,
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapActionToProps)(Relations);
