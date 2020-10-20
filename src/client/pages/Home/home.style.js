import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(8, 0),
    padding: theme.spacing(5, 0, 0),
    textAlign: "center",
  },
  details: {
    margin: theme.spacing(5),
    textAlign: "center",
  },
}));

export default useStyles;
