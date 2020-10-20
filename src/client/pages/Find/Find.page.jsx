import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";

// components
import FindRelation from "../../components/FindRelation/Relation.find";
import SearchList from "../../components/SearchList/List.find";

// styles
import useStyles from "./find.style";

const Find = () => {
  const classes = useStyles();

  // state for list
  const [list, setList] = useState([]);

  return (
    <div className={classes.main}>
      <Typography variant="h4" color="primary">
        Find All Degree of Relations Between
      </Typography>
      <FindRelation setList={setList} />
      <hr />
      <SearchList list={list} />
    </div>
  );
};

export default Find;
