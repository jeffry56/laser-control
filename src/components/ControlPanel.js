import React, { Component } from 'react';
import styled from 'styled-components/macro';
import Cell from './Cell';
import { Button, SubmitButton } from './Buttons';

const colums = [0, 1, 2, 3];
const rows = [0, 1, 2, 3];

class ControlPanel extends Component {
  state = {
    isLoading: false,
    currentRow: 0,
    currentCol: 0,
    values: {},
    isFocus: true,
  };
  _handleKeyPress = e => {
    if (!e.metaKey) return;
    this.setState({
      isFocus: true,
    });
    switch (e.key) {
      case 'ArrowUp':
        if (this.state.currentRow === 0) return;
        this.setState(oldState => ({
          currentRow: oldState.currentRow - 1,
        }));
        break;
      case 'ArrowDown':
        if (this.state.currentRow === rows.length - 1) return;
        this.setState(oldState => ({
          currentRow: oldState.currentRow + 1,
        }));
        break;
      case 'ArrowLeft':
        if (this.state.currentCol === 0) return;
        this.setState(oldState => ({
          currentCol: oldState.currentCol - 1,
        }));
        break;
      case 'ArrowRight':
        if (this.state.currentCol === colums.length - 1) return;
        this.setState(oldState => ({
          currentCol: oldState.currentCol + 1,
        }));
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    const cachedValues = JSON.parse(localStorage.getItem('values'));

    if (cachedValues) {
      this.setState({
        values: cachedValues,
      });
    }
  }
  handleChange = (value, key) => {
    console.log(key);
    localStorage.setItem('values', JSON.stringify(this.state.values));
    this.setState(oldState => ({
      ...oldState,
      values: { ...oldState.values, [key]: value },
    }));
  };

  handleClear = (x, y) => {
    this.setState(
      oldState => ({
        ...oldState,
        values: { ...oldState.values, [`${x}${y}`]: '' },
      }),
      () => {
        localStorage.setItem('values', JSON.stringify(this.state.values));
      }
    );
  };
  render() {
    return (
      <div>
        <ButtonContainer>
          <ClearButton
            small
            inverse
            onClick={() => {
              this.setState({
                values: {},
              });
              localStorage.removeItem('values');
            }}
          >
            Clear all
          </ClearButton>
        </ButtonContainer>
        <PanelContainer
          onKeyDown={this._handleKeyPress}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() =>
            console.log('BLUR') || this.setState({ isFocus: false })
          }
        >
          {rows.map(row =>
            colums.map(col => (
              <Cell
                canFocus={this.state.isFocus}
                handleClear={this.handleClear}
                handleFocus={(x, y) =>
                  this.setState({
                    isFocus: true,
                    currentRow: x,
                    currentCol: y,
                  })
                }
                key={`${row}${col}`}
                x={row}
                y={col}
                isFocus={
                  this.state.currentRow === row && this.state.currentCol === col
                }
                onChange={this.handleChange}
                value={this.state.values[`${row}${col}`]}
              />
            ))
          )}
        </PanelContainer>
        <ButtonContainer>
          <SubmitButton
            style={{ width: '300px' }}
            isLoading={this.state.isLoading}
          >
            Submit
          </SubmitButton>
        </ButtonContainer>
      </div>
    );
  }
}

const ButtonContainer = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ClearButton = styled(Button)`
  width: auto;
`;
const PanelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-gap: 20px;
  grid-template-rows: repeat(4, 200px);
  margin-bottom: 20px;
`;

export default ControlPanel;
