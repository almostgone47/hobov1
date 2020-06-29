import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class EditableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      originalValue: '',
      isActiveInput: false,
    };
  }

  update = () => {
    const { value, originalValue } = this.state;
    const { updateRental, objProperty } = this.props;

    if (value !== originalValue) {
      updateRental({ [objProperty]: value })
        .then(() => {
          this.setState({
            isActiveInput: false,
            orginalValue: value,
          });
        })
        .catch((err) => {
          toast.error('Could not edit rental, Error: ' + err[0].details, {
            autoClose: 3000,
          });
          this.setState({ isActiveInput: false, value: originalValue });
        });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        value: nextProps.inputObj[nextProps.objProperty],
        originalValue: nextProps.inputObj[nextProps.objProperty],
      });
    }
  }

  toggleInput = () => {
    this.setState({
      value: this.state.originalValue,
      isActiveInput: !this.state.isActiveInput,
    });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.update();
    } else if (e.key === 'Escape') {
      this.toggleInput();
    }
  };
  renderCoponentView = () => {
    const { value, isActiveInput } = this.state;
    const { className, transformView, renderComponent } = this.props;
    if (isActiveInput) {
      return (
        <>
          {renderComponent(value, this.handleChange, this.handleKeyDown)}
          <div className="button-container">
            <button
              className="btn btn-success btn-editable"
              onClick={this.update}
            >
              Save
            </button>
            <button
              className="btn btn-danger btn-editable"
              onClick={this.toggleInput}
            >
              Cancel
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <span className={`editable-item ${className}`}>
          {transformView ? transformView(value) : `${value}`}
        </span>
        <div>
          <ToastContainer />
        </div>
        <div className="button-container">
          <button
            className="btn btn-warning btn-editable"
            onClick={this.toggleInput}
          >
            Edit
          </button>
        </div>
      </>
    );
  };

  render() {
    const { inline } = this.props;

    return (
      <div
        className={`editable-component ${
          inline ? 'editable-component-inline' : ''
        }`}
      >
        {this.renderCoponentView()}
      </div>
    );
  }
}

export default EditableComponent;
