import {
  StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ReactDOM = require("react-dom");

export default class ButtonGroup extends Component {
  
  focus() {
      ReactDOM.findDOMNode(this).focus();
      return true;
  }

  toggleSelect(newValue) {
      const value = this.props.code;

      if (this.props.allowEmpty) {
          // Select the new button or unselect if it's already selected
          this.props.onChange(value !== newValue ? newValue : null);
      } else {
          this.props.onChange(newValue);
      }
  };
  render() {
    const value = this.props.code;
    const buttons = this.props.buttons.map((button, i) => {
        return <button title={button.title}
            type="button"
            id={"" + i}
            ref={"button" + i}
            key={"" + i}
            onClick={this.toggleSelect.bind(this, button.code)}
        >
            {button.name || "" + button.code}
        </button>;
    });

    const outerStyle = {
        display: 'inline-block',
    };
    return <div style={outerStyle}>
        {buttons}
    </div>;
  }
};

ButtonGroup.propTypes = {
  code: PropTypes.any,
  buttons: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.any.isRequired,
      name: PropTypes.node,
      title: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  allowEmpty:PropTypes.bool,
};

ButtonGroup.defaultProps ={
        code: null,
        allowEmpty: true,
};