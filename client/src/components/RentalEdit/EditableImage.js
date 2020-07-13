import React from 'react';

import FileLoader from '../FileLoader/FileLoader';
import EditableComponent from './EditableComponent';

const ImageView = ({ value, ...props }) => <img src={value} {...props}></img>;

const createEvent = (value) => ({ target: { value } });

const EditableImage = (props) => {
  return (
    <EditableComponent
      {...props}
      viewComponent={ImageView}
      renderComponent={(value, onChange, onKeyDown) => (
        <FileLoader
          onFileUpload={(image) => {
            onChange(createEvent(image));
          }}
        />
      )}
    />
  );
};

export default EditableImage;
