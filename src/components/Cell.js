import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import X from './X';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.isFocus);
    if (this.props.isFocus && this.props.canFocus) {
      this.inputRef.current.focus();
    }
  }
  componentDidUpdate() {
    if (this.props.isFocus && this.props.canFocus) {
      this.inputRef.current.focus();
    }
  }
  render() {
    const { x, y, isFocus, canFocus } = this.props;

    return (
      <CellContainer
        isFocus={isFocus && canFocus}
        onClick={() => this.props.handleFocus(x, y)}
        hasValue={this.props.value || false}
      >
        <ClearContainer
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.props.handleClear(x, y);
          }}
        >
          <ClearIcon />
        </ClearContainer>
        <Index isFocus={isFocus && canFocus}>
          {x},{y}
        </Index>
        <Input
          onFocus={() => this.props.handleFocus(x, y)}
          ref={this.inputRef}
          value={this.props.value || ''}
          onChange={event =>
            this.props.onChange(event.target.value, `${x}${y}`)
          }
        />
      </CellContainer>
    );
  }
}

const ClearContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.baseTextColor};
  background-color: #fff;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.errorColor};
    transition: 0.3s;
  }
`;
const ClearIcon = styled(X)`
  height: 15px;
`;
const Index = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 2em;
  border: 1px solid ${({ theme }) => theme.baseTextColor};
  padding: 5px 10px;
  color: ${({ theme }) => theme.baseTextColor};
  font-size: 0.8em;
  ${({ isFocus }) =>
    isFocus &&
    css`
      color: #fff;
      border-color: #fff;
    `}
`;
const Input = styled.input`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 2em;
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  margin: 0 0 10px 0;
  box-shadow: none;
  width: 100%;
  transition: all 0.3s;
  padding: 0 20px;
  letter-spacing: 2px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.mainColor};
    transition: 0.3s;
  }
`;
const CellContainer = styled.div`
  position: relative;
  box-shadow: 0 6px 15px 0 rgba(36, 37, 38, 0.08);
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  ${({ isFocus }) =>
    isFocus &&
    css`
      box-shadow: 0 6px 15px 0 rgba(36, 37, 38, 0.18);
      background: ${({ theme }) => theme.second.gradient};
      transition: 0.3s;
    `}
  &:hover {
    cursor: pointer;
  }
  ${({ hasValue }) =>
    hasValue &&
    css`
      background-color: #e0f7fa;
    `}
`;

export default Cell;
