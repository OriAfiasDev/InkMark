import React from 'react';
import styled from 'styled-components';
import { ColorContainer } from './components/ColorContainer';
import './Popup.css';
import { allColors } from './seed/colors';

const Popup = () => {
  return (
    <PopupContainer>
      <ColorContainer
        title="favorites"
        colors={allColors.filter((color) => color.isFavorite)}
      />
      <ColorContainer
        title="most common"
        colors={allColors.filter((color) => color.isMostCommon)}
      />
      <ColorContainer
        title="solid"
        colors={allColors.filter((color) => color.type === 'solid')}
      />
      <ColorContainer
        title="gradients"
        colors={allColors.filter((color) => color.type === 'gradient')}
      />
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  padding: 10px;
  height: 340px;
  overflow: hidden auto;
`;

export default Popup;
