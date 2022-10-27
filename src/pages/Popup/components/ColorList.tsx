import React from 'react';
import styled from 'styled-components';
import { IColor } from '../types/IColor';
import { ColorItem } from './ColorItem';
import { StyledTitle } from './Section';

interface ColorListProps {
  colors: IColor[];
}

export const ColorList: React.FC<ColorListProps> = ({ colors }) =>
  colors.length === 0 ? (
    <NoColorsText>no colors yet</NoColorsText>
  ) : (
    <StyledColorContainer>
      {colors.map((color, i) => (
        <ColorItem key={color.id} color={color} index={i} />
      ))}
    </StyledColorContainer>
  );

const NoColorsText = styled(StyledTitle)`
  justify-content: center;
  font-size: 10px;
  padding: 12px 0;
`;

const StyledColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6px;
`;
