import React from "react";

const ConfirmationPopup = ({ setOpen,unstaking }) => {
  return (
    <div className="confirmation-popup-body flex flex-col justify-between">
      <h1 className="title">Are you sure!</h1>
      <p className="desc">
        Lorem ipsum dolor sit amet consectetur. Leo malesuada ac enim tortor
        egestas mattis. Quis nulla nec sagittis neque eu nunc quis urna. Sit
        dolor lectus purus integer neque in. Magna tortor sit lobortis sem orci
        vitae nisl. Et consequat.
      </p>
      <div className="actions flex items-center justify-center w-full">
        <button className="btn-c button" onClick={(e) => {setOpen(false);unstaking()}}>
          Yes
        </button>
        <button className="btn-c button" onClick={(e) => {setOpen(false);unstaking()}}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
