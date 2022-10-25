import React, { useCallback } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { StyledTitle } from './ColorSection';

const saveColorToLocalStorage = (color: string) => {
  chrome.storage.sync.get('savedColors', (data) => {
    const savedColors = data.savedColors || [];
    savedColors.push(color);
    chrome.storage.sync.set({ savedColors });
  });
};

export const Picker = () => {
  const [color, setColor] = React.useState('#fff');

  const saveColor = useCallback(() => {
    saveColorToLocalStorage(color);
    window.location.reload();
  }, [color]);

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
      <SaveButton onClick={saveColor}>Save</SaveButton>
    </div>
  );
};

const SaveButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #ff0081;
  color: white;
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
    background-color: #d61877;
  }
`;
