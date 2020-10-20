import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    padding: theme.spacing(20, 0),
  },
  item: {
    margin: theme.spacing(3, 0, 0),
  },
  list: {
    textAlign: "center",
    marginTop: "5%",
  },
}));

export default useStyles;
