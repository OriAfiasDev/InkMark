import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { removeColor, toggleFavorite } from '../../../utils/syncStorage';
import { colorScheme } from '../globalStyles/colorScheme';
import { IColor } from '../types/IColor';
import { ColorBox, copyToClipboard } from './Color';

interface ColorItemProps {
  color: IColor;
}

export const ColorItem: React.FC<PropsWithChildren<ColorItemProps>> = ({
  color,
}) => (
  <DropdownContainer>
    <ColorBox color={color} />
    <DropdownContentContainer>
      <DropdownItem onClick={() => copyToClipboard('green', color.id)}>
        Copy to clipbord
      </DropdownItem>
      <DropdownItem onClick={() => toggleFavorite(color.id)}>
        {color.isFavorite ? 'Remove from ' : 'Add to '}Favorites
      </DropdownItem>
      <DropdownItem onClick={() => removeColor(color.id)}>
        Remove color
      </DropdownItem>
    </DropdownContentContainer>
  </DropdownContainer>
);

const arrowPeak = 15;

const DropdownContentContainer = styled.div`
  display: none;
  position: absolute;
  background-color: ${colorScheme.dark.backgroundSecondary};
  border-radius: 8px;
  top: 0;
  left: 70px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  clip-path: polygon(
    4% ${arrowPeak - 7}%,
    4% 0,
    100% 0,
    100% 100%,
    4% 100%,
    4% ${arrowPeak + 7}%,
    0 ${arrowPeak}%
  );
`;

const DropdownItem = styled.p`
  color: ${colorScheme.dark.text};
  padding: 8px 16px;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: ${colorScheme.dark.backgroundSecondaryHover};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    & ${DropdownContentContainer} {
      display: block;
    }
  }
`;
