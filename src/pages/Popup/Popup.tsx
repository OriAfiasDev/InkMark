import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  getColors,
  listenToColors,
  resetColors,
} from '../../utils/syncStorage';
import { colorScheme } from './globalStyles/colorScheme';
import { Picker } from './components/Picker';
import { IColor } from './types/IColor';
import { ColorList } from './components/ColorList';
import { Section } from './components/Section';

const Popup = () => {
  const [colors, setColors] = React.useState<IColor[]>([]);

  useEffect(() => {
    getColors().then((colors) => {
      setColors(colors);
    });
    listenToColors(setColors);
  }, []);

  return (
    <PopupContainer>
      <button onClick={resetColors}>reset</button>
      <Section isOpenDefault title="favorites">
        <ColorList colors={colors.filter((color) => color.isFavorite)} />
      </Section>

      <Section isOpenDefault title="most common">
        <ColorList
          colors={[...colors].sort((a, b) => b.count - a.count).slice(0, 4)}
        />
      </Section>

      <Section title="all colors">
        <ColorList colors={colors} />
      </Section>

      <Section title="only solids">
        <ColorList colors={colors.filter((color) => color.type === 'solid')} />
      </Section>

      <Section title="only gradients">
        <ColorList
          colors={colors.filter((color) => color.type === 'gradient')}
        />
      </Section>
      <Section title="add color">
        <Picker />
      </Section>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  padding: 10px;
  height: 340px;
  overflow: hidden auto;
  background-color: ${colorScheme.dark.background};
`;

export default Popup;
