import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ColorContainer } from './components/ColorContainer';
import { allColors } from './seed/colors';

const colorsFromGoogleSync = async (): Promise<string[]> => {
  const { savedColors } = await chrome.storage.local.get('savedColors');
  return savedColors || [];
};

const Popup = () => {
  const [stored, setStored] = React.useState<string[]>([]);

  useEffect(() => {
    colorsFromGoogleSync().then((data) => {
      setStored(data);
    });
  }, []);

  return (
    <PopupContainer>
      <ColorContainer
        title="favorites"
        colors={allColors.filter((color) => color.isFavorite)}
      />
      <ColorContainer
        title="stored"
        colors={stored.map((color) => ({
          //TODO:
          id: 'masldkmsalmdl',
          isMostCommon: false,
          type: 'solid',
          color,
          isFavorite: false,
        }))}
      />
      <ColorContainer
        title="most common"
        colors={allColors.filter((color) => color.isMostCommon)}
      />
      <ColorContainer
        title="all solids"
        colors={allColors.filter((color) => color.type === 'solid')}
      />
      <ColorContainer
        title="all gradients"
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
