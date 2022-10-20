import React from 'react';
import styled from 'styled-components';
import { Color } from './components/Color';
import { ColorContainer } from './components/ColorContainer';
import './Popup.css';

const Popup = () => {
  return (
    <PopupContainer>
      <ColorContainer title="favorites">
        <Color color="#1c012e" />
        <Color color="#6d00ad" />
        <Color color="#f8f8f8" />
        <Color />
      </ColorContainer>
      <ColorContainer title="most common">
        <Color color="#6d00ad" />
        <Color color="#681DB8" />
        <Color color="#6a56c3" />
        <Color color="#79a1d7" />
        <Color color="#81badd" />
        <Color color="#8cc8dc" />
        <Color color="#a3eadd" />
        <Color color="#b0fbde" />
      </ColorContainer>
      <ColorContainer title="gradients">
        <Color color="linear-gradient(to right, #904e95, #e96443);" />
        <Color color="linear-gradient(to right, #FFC371, #FF5F6D);" />
      </ColorContainer>
      <ColorContainer title="gradients">
        <Color color="linear-gradient(to right, #904e95, #e96443);" />
        <Color color="linear-gradient(to right, #FFC371, #FF5F6D);" />
      </ColorContainer>
      <ColorContainer title="gradients">
        <Color color="linear-gradient(to right, #904e95, #e96443);" />
        <Color color="linear-gradient(to right, #FFC371, #FF5F6D);" />
      </ColorContainer>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  padding: 10px;
  height: 340px;
  overflow: hidden auto;
`;

export default Popup;
