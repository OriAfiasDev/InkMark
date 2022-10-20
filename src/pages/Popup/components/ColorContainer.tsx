import React from 'react';
import styled from 'styled-components';
import { IColor } from '../types/IColor';
import { Color } from './Color';

interface ColorContainerProps {
  title: string;
  colors: IColor[];
}

export const ColorContainer: React.FC<ColorContainerProps> = ({
  title,
  colors,
}) => (
  <section>
    <StyledTitle>{title}</StyledTitle>
    <StyledColorContainer>
      {colors.map(({ id, ...rest }) => (
        <Color key={id} {...rest} toggleIsFavorite={console.log} />
      ))}
    </StyledColorContainer>
  </section>
);

const StyledTitle = styled.p`
  font-family: PP Neue Machina;
  font-weight: 400;
  font-size: 12px;
  color: #707482;
  padding-left: 4px;
  text-transform: uppercase;
`;

const StyledColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6px;
`;
