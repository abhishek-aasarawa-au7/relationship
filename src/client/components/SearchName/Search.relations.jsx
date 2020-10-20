import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

// style
import useStyles from "./search.style";

// http request
import httpRequest from "../../configs/axiosConfig";

import { SET_NOTIFICATION } from "../../redux/actions/notification.action";
import { apiUrl } from "../../configs/apiURL";

const SearchName = ({ setData, setFlag, setNotification }) => {
  const classes = useStyles();

  // data validation
  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
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
  const onEnterHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        let { name } = formik.values;

        let response = await httpRequest({
          method: "GET",
          url: `${apiUrl}/users/all?name=${name}`,
        });

        setNotification({
          msg: response.data.msg,
          severity: "success",
          open: true,
        });
        // setting state
        setData(response.data.data);
        setFlag(true);
      } catch (err) {
        setFlag(false);
        setNotification({
          msg: !!err.response ? err.response.data.msg : "Sorry! Server is down",
          open: true,
          severity: "error",
        });
      }
    }
  };

  return (
    <Grid
      container
      className={classes.main}
      alignContent="center"
      justify="space-evenly"
    >
      <Grid item xs={"auto"} sm={4}></Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          name="name"
          variant="outlined"
          label="Search Relations of Person"
          id="name"
          placeholder="Enter Name of Person"
          value={formik.values.name}
          onChange={onChangeHandle}
          error={formik.errors.name && formik.touched.name}
          helperText={formik.errors.name}
          onKeyPress={onEnterHandler}
          autoFocus
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={"auto"} sm={4}></Grid>
    </Grid>
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

export default connect(null, mapActionToProps)(SearchName);
