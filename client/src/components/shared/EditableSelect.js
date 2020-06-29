import React from 'react';

import EditableComponent from './EditableComponent';

const EditableSelect = (props) => {
  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option} value={option}>
        {`${option}`}
      </option>
    ));
  };

  const { className, options } = props;

  return (
    <EditableComponent
      {...props}
      renderComponent={(value, handleChange, onKeyDown) => (
        <select
          onKeyDown={onKeyDown}
          onChange={handleChange}
          className={`editable-item ${className}`}
          value={value}
        >
          {renderOptions(options)}
        </select>
      )}
    />
  );
};

export default EditableSelect;
