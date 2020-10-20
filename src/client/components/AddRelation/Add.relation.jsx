import React from "react";
import Modal from "@material-ui/core/Modal";

// component
import Body from "./Body.relation";

// styles
import { getModalStyle, useStyles } from "./add.style";

const AddRelation = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
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

export default AddRelation;
