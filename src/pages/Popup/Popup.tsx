import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ColorSection } from './components/ColorSection';
import { Picker } from './components/Picker';
import { allColors } from './seed/colors';

const colorsFromGoogleSync = async (): Promise<string[]> => {
  const { savedColors } = await chrome.storage.sync.get('savedColors');
  return savedColors || [];
};

const resetColorsFromGoogleSync = async () => {
  await chrome.storage.sync.set({ savedColors: [] });
  window.location.reload();
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
      <button onClick={resetColorsFromGoogleSync}>reset</button>
      <ColorSection
        title="favorites"
        colors={allColors.filter((color) => color.isFavorite)}
      />
      <ColorSection
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
      <ColorSection
        title="most common"
        colors={allColors.filter((color) => color.isMostCommon)}
      />
      <ColorSection
        title="all solids"
        colors={allColors.filter((color) => color.type === 'solid')}
      />
      <ColorSection
        title="all gradients"
        colors={allColors.filter((color) => color.type === 'gradient')}
      />
      <Picker />
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  padding: 10px;
  height: 340px;
  overflow: hidden auto;
`;

export default Popup;
