import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { removeColor, toggleFavorite } from '../../../utils/syncStorage';
import { colorScheme } from '../globalStyles/colorScheme';
import { IColor } from '../types/IColor';
import { ColorBox, copyToClipboard } from './Color';

interface ColorItemProps {
  color: IColor;
  index: number;
}

export const ColorItem: React.FC<PropsWithChildren<ColorItemProps>> = ({
  color,
  index,
}) => (
  <DropdownContainer>
    <ColorBox color={color} />
    <DropdownContentContainer side={index % 4 > 1 ? 'right' : 'left'}>
      <DropdownItem bold onClick={() => copyToClipboard(color.color, color.id)}>
        {color.color}
      </DropdownItem>
      <Divider />
      <DropdownItem onClick={() => copyToClipboard(color.color, color.id)}>
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

const DropdownContentContainer = styled.div<{ side: 'left' | 'right' }>`
  display: none;
  position: absolute;
  background-color: ${colorScheme.dark.backgroundSecondary};
  border-radius: 8px;
  top: 0;
  ${({ side }) => side}: 70px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  clip-path: ${({ side }) => `polygon(
          ${side === 'left' ? '4%' : '96%'} ${arrowPeak - 7}%,
          ${side === 'left' ? '4%' : '96%'} 0,
          ${side === 'left' ? '100%' : '0%'} 0,
          ${side === 'left' ? '100%' : '0%'} 100%,
          ${side === 'left' ? '4%' : '96%'} 100%,
          ${side === 'left' ? '4%' : '96%'} ${arrowPeak + 7}%,
          ${side === 'left' ? '0%' : '100%'} ${arrowPeak}%
        )`};
`;

const DropdownItem = styled.p<{ bold?: boolean }>`
  color: ${colorScheme.dark.text};
  padding: 8px 16px;
  margin: 2px 0;
  display: block;
  cursor: pointer;
  font-weight: ${({ bold }) => (bold ? '800' : '400')};

  &:hover {
    background-color: ${colorScheme.dark.backgroundSecondaryHover};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px;
  margin: -10px;

  &:hover {
    & ${DropdownContentContainer} {
      display: block;
    }
  }
`;

const Divider = styled.hr`
  opacity: 0.1;
`;
