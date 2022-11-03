import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { removeColor, toggleFavorite } from '../../../utils/syncStorage';
import { useColors } from '../context/ColorContext';
import { colorScheme } from '../globalStyles/colorScheme';
import { IColor } from '../types/IColor';
import { Autocomplete } from './Autocomplete';
import { ColorBox, copyToClipboard } from './Color';

interface ColorItemProps {
  color: IColor;
  index: number;
}

export const ColorItem: React.FC<PropsWithChildren<ColorItemProps>> = ({
  color,
  index,
}) => {
  const [tagsQuery, setTagsQuery] = useState('');
  const { tags } = useColors();
  return (
    <DropdownContainer>
      <ColorBox color={color} />
      <DropdownContentContainer side={index % 4 > 1 ? 'right' : 'left'}>
        <DropdownItem
          bold
          align="center"
          onClick={() => copyToClipboard(color.color, color.id)}
        >
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
        <DropdownItem>
          <Autocomplete
            query={tagsQuery}
            setQuery={setTagsQuery}
            suggestions={Object.keys(tags)}
            currentValues={color.tags}
            colorId={color.id}
          />
        </DropdownItem>
      </DropdownContentContainer>
    </DropdownContainer>
  );
};

const arrowPeak = 22.5;

const DropdownContentContainer = styled.div<{ side: 'left' | 'right' }>`
  display: none;
  position: absolute;
  background-color: ${colorScheme.dark.backgroundSecondary};
  border-radius: 8px;
  top: 0;
  ${({ side }) => side}: 75px;
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

const DropdownItem = styled.p<{
  bold?: boolean;
  align?: 'left' | 'center';
}>`
  color: ${colorScheme.dark.text};
  padding: 8px 16px;
  margin: 2px 0;
  display: block;
  cursor: pointer;
  font-weight: ${({ bold }) => (bold ? '800' : '400')};
  text-align: ${({ align }) => align || 'left'};

  &:hover {
    background-color: ${colorScheme.dark.backgroundSecondaryHover};
    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
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
