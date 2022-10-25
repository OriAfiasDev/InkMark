import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getColors, resetColors } from '../../utils/syncStorage';
import { ColorSection } from './components/ColorSection';
import { Picker } from './components/Picker';
import { allColors } from './seed/colors';
import { IColor } from './types/IColor';

const resetColorsFromGoogleSync = async () => {
  await resetColors();
  window.location.reload();
};

const Popup = () => {
  const [stored, setStored] = React.useState<IColor[]>([]);

  useEffect(() => {
    getColors().then((colors) => {
      setStored(colors);
    });
  }, []);

  return (
    <PopupContainer>
      <button onClick={resetColorsFromGoogleSync}>reset</button>
      <ColorSection
        title="favorites"
        colors={allColors.filter((color) => color.isFavorite)}
      />
      <ColorSection title="stored" colors={stored} />
      <ColorSection
        title="most common"
        colors={allColors.sort((a, b) => b.count - a.count).slice(0, 4)}
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
