import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getColors, resetColors } from '../../utils/syncStorage';
import { ColorSection } from './components/ColorSection';
import { Picker } from './components/Picker';
import { IColor } from './types/IColor';

const resetColorsFromGoogleSync = async () => {
  await resetColors();
  window.location.reload();
};

const Popup = () => {
  const [colors, setColors] = React.useState<IColor[]>([]);

  useEffect(() => {
    getColors().then((colors) => {
      setColors(colors);
    });
  }, []);

  return (
    <PopupContainer>
      <button onClick={resetColorsFromGoogleSync}>reset</button>
      <ColorSection
        title="favorites"
        colors={colors.filter((color) => color.isFavorite)}
      />

      <ColorSection
        title="most common"
        colors={[...colors].sort((a, b) => b.count - a.count).slice(0, 4)}
      />

      <ColorSection title="all colors" colors={colors} />

      <ColorSection
        title="only solids"
        colors={colors.filter((color) => color.type === 'solid')}
      />

      <ColorSection
        title="only gradients"
        colors={colors.filter((color) => color.type === 'gradient')}
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
