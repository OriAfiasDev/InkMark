import React from 'react';
import styled from 'styled-components';
import { colorScheme } from '../globalStyles/colorScheme';
import { Picker } from './Picker';
import { ColorList } from './ColorList';
import { Section } from './Section';
import { useColors } from '../context/ColorContext';

const Popup = () => {
  const { colors, favorites, gradients, mostCommon, solids, tags } =
    useColors();

  return (
    <PopupContainer>
      <Section isOpenDefault={favorites.length > 0} title="favorites">
        <ColorList colors={favorites} />
      </Section>

      <Section isOpenDefault={mostCommon.length > 0} title="most common">
        <ColorList colors={mostCommon} />
      </Section>

      {Object.keys(tags).map((tag) => (
        <Section key={tag} title={tag}>
          <ColorList colors={tags[tag]} />
        </Section>
      ))}

      <Section title="all colors">
        <ColorList colors={colors} />
      </Section>

      <Section title="only solids">
        <ColorList colors={solids} />
      </Section>

      <Section title="only gradients">
        <ColorList colors={gradients} />
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
