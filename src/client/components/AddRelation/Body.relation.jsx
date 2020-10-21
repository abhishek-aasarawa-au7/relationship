import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import CreateIcon from "@material-ui/icons/Create";
import { connect } from "react-redux";

// axios
import httpRequest from "../../configs/axiosConfig";

// styles
import useStyles from "./body.style";

import { SET_NOTIFICATION } from "../../redux/actions/notification.action";
import { UPDATE_DATA } from "../../redux/actions/user.actions";
import { apiUrl } from "../../configs/apiURL";

const Body = ({ setNotification, setIsOpen, index, userData, updateData }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues:
      index === -1
        ? {
            firstPerson: "",
            secPerson: "",
            relation: "",
          }
        : {
            firstPerson: userData.name,
            secPerson: userData.list[index].name,
            relation: userData.relations[index],
          },

    validationSchema: Yup.object({
      firstPerson: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(30, "Maximum 30 characters")
        .required("Required!"),
      secPerson: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(30, "Maximum 30 characters")
        .required("Required!"),
      relation: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(30, "Maximum 30 characters")
        .required("Required!"),
    }),
  });

  // formik input handle
  let onChangeHandle = (e) => {
    if (
      index !== -1 &&
      e.target.id !== "firstPerson" &&
      e.target.id !== "secPerson"
    ) {
      formik.setFieldTouched(e.target.id);
      return formik.handleChange(e);
    }
    if (index === -1) {
      formik.setFieldTouched(e.target.id);
      return formik.handleChange(e);
    }
  };

  // on click submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        firstPerson: formik.values.firstPerson,
        secPerson: formik.values.secPerson,
        relation: formik.values.relation,
      };

      let response = await httpRequest({
        method: "POST",
        url: index === -1 ? `${apiUrl}/users/new` : `${apiUrl}/users/update`,
        data,
      });

      updateData({
        index,
        relation: formik.values.relation,
      });

      setIsOpen(false);

      setNotification({
        open: true,
        msg: response.data.msg,
        severity: "success",
      });
    } catch (err) {
      setNotification({
        open: true,
        msg:
          !!err.response && !!err.response.data
            ? err.response.data.msg
            : "Sorry! Server is down",
        severity: "error",
      });
    }
  };

  // return component -----------------------------------------------------------
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {index === -1 ? "Add Relation" : "Update Relation"}
        </Typography>

        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstPerson"
            label="From Person"
            name="firstPerson"
            autoComplete="firstPerson"
            onChange={onChangeHandle}
            value={formik.values.firstPerson}
            error={formik.errors.firstPerson && formik.touched.firstPerson}
            helperText={formik.errors.firstPerson}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="secPerson"
            label="To Person"
            type="secPerson"
            id="secPerson"
            value={formik.values.secPerson}
            onChange={onChangeHandle}
            error={formik.errors.secPerson && formik.touched.secPerson}
            helperText={formik.errors.secPerson}
            autoComplete="current-secPerson"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="relation"
            label="relation"
            type="relation"
            id="relation"
            onChange={onChangeHandle}
            value={formik.values.relation}
            error={formik.errors.relation && formik.touched.relation}
            helperText={formik.errors.relation}
            autoComplete="current-relation"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!formik.errors.firstPerson || !!formik.errors.secPerson}
          >
            {index === -1 ? "CREATE" : "UPDATE"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    index: state.list,
    userData: state.userData,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
    updateData: (data) => {
      dispatch({
        type: UPDATE_DATA,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(Body);
