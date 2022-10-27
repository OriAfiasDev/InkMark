import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { addNewColor } from '../../../utils/syncStorage';
import { colorScheme } from '../globalStyles/colorScheme';
import { StyledTitle } from './ColorSection';

export const Picker = () => {
  const [color, setColor] = useState('#fff');

  return (
    <div>
      <StyledTitle>Add Color</StyledTitle>
      <ChromePicker
        onChange={(color) => setColor(color.hex)}
        color={color}
        styles={{
          default: { picker: { width: '100%' } },
        }}
      />
      <SaveButton onClick={() => addNewColor(color)}>Save</SaveButton>
    </div>
  );
};

const SaveButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${colorScheme.dark.primary};
  color: ${colorScheme.dark.text};
  font-family: PP Neue Machina;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: ${colorScheme.dark.primaryHover};
  }
`;
