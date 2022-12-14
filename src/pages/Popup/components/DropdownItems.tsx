import React from 'react';
import styled from 'styled-components';
import {
  removeColor,
  toggleFavorite,
  toggleTag,
} from '../../../utils/syncStorage';
import { colorScheme } from '../globalStyles/colorScheme';
import { IColor } from '../types/IColor';
import { copyToClipboard } from './Color';

interface DropdownItemsProps {
  colorIndex: number;
  color: IColor;
}

export const DropdownItems: React.FC<DropdownItemsProps> = ({
  colorIndex,
  color,
}) => (
  <DropdownContentContainer side={colorIndex % 4 > 1 ? 'right' : 'left'}>
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
    <DropdownItem
      onClick={() =>
        toggleTag(color.id, color.tag ? color.tag : prompt('add tag') || '')
      }
    >
      {color.tag ? `Remove ${color.tag}` : 'Add '} tag
    </DropdownItem>
  </DropdownContentContainer>
);

export const DropdownContentContainer = styled.div<{ side: 'left' | 'right' }>`
  display: none;
  position: absolute;
  background-color: ${colorScheme.dark.backgroundSecondary};
  border-radius: 8px;
  top: 0;
  ${({ side }) => side}: 70px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid ${colorScheme.dark.backgroundSecondary};
    position: absolute;
    top: -115px;
    bottom: 0;
    margin: auto 0;
    left: -8px;
  }
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

const Divider = styled.hr`
  opacity: 0.1;
`;
