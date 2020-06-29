import React from 'react';

import EditableComponent from './EditableComponent';

const EditableInput = (props) => {
  return (
    <EditableComponent
      {...props}
      renderComponent={(value, handleChange, onKeyDown) => (
        <input
          onKeyDown={onKeyDown}
          value={value}
          onChange={handleChange}
          className={`editable-item ${props.className}`}
        ></input>
      )}
    />
  );
};

export default EditableInput;
