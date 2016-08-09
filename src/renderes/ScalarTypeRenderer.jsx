import React, {Component, PropTypes} from "react";

import BaseRenderer from './BaseRenderer';

export default class ScalarTypeRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this);
    this.state = {
      value: ''
    }
  }

  render() {
    const label = this.getLabel();

    if(!this.shouldRenderMyself()) return null;

    return (
      <div className="form-group">
        {label ? <label>{label} </label> : null}
        {this._renderInput()}
        {this._renderHelpText()}
      </div>
    )
  }

  _renderInput() {
    let placeholder = this.getPlaceholder()
    let fieldOptions = this.myFieldOptions();
    const extraProps = fieldOptions._props;
    const textType = fieldOptions._textType || "";
    const defaultValue = this.props.data || "";
    switch (textType) {
      case 'textarea':
        return (
          <textarea type="text" className="form-control" placeholder={placeholder} onChange={this._onChange} ref={(ref) => {this.input=ref}} {...extraProps} defaultValue={defaultValue} />
        )
      default:
        return (
          <input type="text" className="form-control" placeholder={placeholder} onChange={this._onChange} ref={(ref) => {this.input=ref}} {...extraProps} defaultValue={defaultValue} />
        )
    }
  }

  _onChange(e) {
    const {onChange, path} = this.props;
    const value = e.target.value;
    this.setState({value})
    onChange(path, value)
  }

  getValue() {
    return this.input ? this.input.value : "";
  }
}