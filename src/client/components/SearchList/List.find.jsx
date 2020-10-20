import React from "react";
import { map } from "lodash";
import Typography from "@material-ui/core/Typography";

// import style
import useStyles from "./list.style";

const changeInLine = (item) => {
  let str = item.join("  >  ");
  return str;
};

const SearchList = ({ list }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {map(list, (item, idx) => {
        return (
          <Typography
            key={idx}
            variant="h6"
            color="primary"
            className={classes.list}
          >
            {changeInLine(item)}
          </Typography>
        );
      })}
    </div>
  );
};

export default SearchList;
