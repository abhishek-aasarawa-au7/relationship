import React, { useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

import { UPDATE_INDEX } from "../../redux/actions/list.action";

// component
import Body from "./Body.relation";

// styles
import { getModalStyle, useStyles } from "./add.style";

const AddRelation = ({ isOpen, setIsOpen, setIndex }) => {
  const classes = useStyles();

  useEffect(() => {
    return function cleanup() {
      setIndex(-1);
    };
  }, [setIndex]);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Body setIsOpen={setIsOpen} />
    </div>
  );

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setIndex: (idx) =>
      dispatch({
        type: UPDATE_INDEX,
        payload: idx,
      }),
  };
};

export default connect(null, mapActionToProps)(AddRelation);
