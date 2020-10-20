import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

// style
import useStyles from "./relation.find.style";

// http request
import httpRequest from "../../configs/axiosConfig";

import { SET_NOTIFICATION } from "../../redux/actions/notification.action";
import { apiUrl } from "../../configs/apiURL";

const SearchRelation = ({ setList, setNotification }) => {
  const classes = useStyles();

  // data validation
  const formik = useFormik({
    initialValues: {
      firstPerson: "",
      secPerson: "",
    },

    validationSchema: Yup.object({
      firstPerson: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(10, "Maximum 30 characters")
        .required("Required!"),
      secPerson: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(10, "Maximum 30 characters")
        .required("Required!"),
    }),
  });

  // input data handle
  const onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data = {
        firstPerson: formik.values.firstPerson,
        secPerson: formik.values.secPerson,
      };

      let response = await httpRequest({
        method: "POST",
        url: `${apiUrl}/users/find`,
        data,
      });

      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });

      // setting state
      setList(response.data.data);
    } catch (err) {
      setNotification({
        open: true,
        msg: !!err.response ? err.response.data.msg : "Sorry! Server is down",
        severity: "error",
      });
    }
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        spacing={3}
        className={classes.main}
        alignContent="center"
        justify="space-evenly"
      >
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            name="firstPerson"
            variant="outlined"
            label="First Person"
            id="firstPerson"
            value={formik.values.firstPerson}
            onChange={onChangeHandle}
            error={formik.errors.firstPerson && formik.touched.firstPerson}
            helperText={formik.errors.firstPerson}
            autoFocus
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            required
            label="Second Person"
            name="secPerson"
            id="secPerson"
            value={formik.values.secPerson}
            onChange={onChangeHandle}
            error={formik.errors.secPerson && formik.touched.secPerson}
            helperText={formik.errors.secPerson}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
      <Button
        variant="contained"
        color="inherit"
        size="medium"
        type="submit"
        className={classes.button}
        disabled={!!formik.errors.firstPerson || !!formik.errors.secPerson}
        startIcon={<SearchIcon fontSize="large" />}
      >
        Search
      </Button>
    </form>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(null, mapActionToProps)(SearchRelation);
