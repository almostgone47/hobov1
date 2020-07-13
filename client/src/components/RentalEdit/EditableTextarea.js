import React from 'react';

import EditableComponent from './EditableComponent';

const EditableTextarea = (props) => {
  const { rows, cols, className } = props;
  return (
    <EditableComponent
      {...props}
      renderComponent={(value, handleChange, onKeyDown) => (
        <textarea
          onKeyDown={onKeyDown}
          value={value}
          onChange={handleChange}
          className={`editable-item ${className}`}
          rows={rows}
          cols={cols}
        ></textarea>
      )}
    />
  );
};

export default EditableTextarea;
