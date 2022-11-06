import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { IColor } from '../types/IColor';
import { ColorBox } from './Color';
import { DropdownContentContainer, DropdownItems } from './DropdownItems';

interface ColorItemProps {
  color: IColor;
  index: number;
}

export const ColorItem: React.FC<PropsWithChildren<ColorItemProps>> = ({
  color,
  index,
}) => {
  return (
    <DropdownContainer>
      <ColorBox color={color} />
      <DropdownItems color={color} colorIndex={index} />
    </DropdownContainer>
  );
};

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
