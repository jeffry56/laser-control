import React from 'react';
import PropTypes from 'prop-types';
import ArrowRight from './ArrowRight';
import styled, { css, keyframes } from 'styled-components/macro';

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const RoundLoading = styled.div`
  margin: 0.2rem;
  position: relative;
  text-indent: -9999em;
  border-top: 2px solid #eee;
  border-right: 2px solid #eee;
  border-bottom: 2px solid #eee;
  border-left: 2px solid ${({ theme }) => theme.mainColor};
  transform: translateZ(0);
  animation: ${rotate} 1s infinite linear;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  &:after {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
  }
`;

const ripple = keyframes`
0% {
  transform: scale(0, 0);
  opacity: 1;
}
20% {
  transform: scale(25, 25);
  opacity: 1;
}
100% {
  opacity: 0;
  transform: scale(40, 40);
}
`;

export const Button = styled.button`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme, color }) => color || theme.mainColor};
  box-shadow: none;
  border: none;
  height: 3rem;
  line-height: 3em;
  padding: 0 2rem;
  font-size: 0.9rem;
  width: 100%;
  text-transform: uppercase;
  vertical-align: middle;
  letter-spacing: 1px;
  transition: 0.3s;
  color: #fff;
  border-radius: 2em;
  border: 1px solid transparent;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5%;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${ripple} 1s ease-out;
  }
  &:hover {
    transition: 0.3s;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.14);
    color: ${({ theme, color }) => color || theme.mainColor};
    border-color: ${({ theme, color }) => color || theme.mainColor};
  }
  &:focus {
    outline: 0px;
  }

  ${({ inverse }) =>
    inverse &&
    css`
      background-color: #fff;
      border-color: ${({ theme, color }) => color || theme.mainColor};
      color: ${({ theme, color }) => color || theme.mainColor};
      &:hover {
        transition: 0.3s;
        background-color: ${({ theme, color }) => color || theme.mainColor};
        color: #fff;
      }
    `}
    ${({ disabled }) =>
      disabled &&
      css`
        border: 1px solid #90a4ae !important;
        background-color: #fff !important;
        color: #90a4ae !important;
        &:hover {
          cursor: not-allowed !important;
          background-color: #fff !important;
          border: 1px solid #90a4ae !important;
          color: #90a4ae !important;
          box-shadow: none !important;
        }
      `}
    ${({ small }) =>
      small &&
      css`
        height: 2rem;
        font-size: 0.9rem;
        line-height: 2rem;
      `};
`;

export const SubmitButton = ({
  isLoading,
  disabled,
  children,
  onFocus,
  style,
  ...props
}) => (
  <SubButton
    type="submit"
    disabled={isLoading || disabled}
    style={style}
    onFocus={onFocus}
    {...props}
  >
    {isLoading ? (
      <RoundLoading />
    ) : (
      <Container>
        <ArrowRightIcon disabled={isLoading || disabled} />
        <Content disabled={isLoading || disabled}>{children}</Content>
      </Container>
    )}
  </SubButton>
);

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onFocus: PropTypes.func,
};

const Container = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const SubButton = styled(Button)`
  margin: 10px 0;
  border: none;
  font-weight: bold;
  letter-spacing: 5px;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        border: none;
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
      }
    `}
`;

const Content = styled.div`
  transition: 0.3s;
  transform: translateX(0);
  ${({ disabled }) =>
    !disabled &&
    css`
      ${SubButton}:hover & {
        transition: 0.3s;
        transform: translateX(100%);
      }
    `}
`;
const ArrowRightIcon = styled(ArrowRight)`
  transition: 0.3s;
  color: #fff;
  position: absolute;
  left: -50px;
  ${({ disabled }) =>
    !disabled &&
    css`
      ${SubButton}:hover & {
        transition: 0.3s;
        left: calc(50% + -12px);
      }
    `}
`;
