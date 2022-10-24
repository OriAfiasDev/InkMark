import React from 'react';
import styled from 'styled-components';
import { IColor } from '../types/IColor';
import { Color } from './Color';

interface ColorContainerProps {
  title: string;
  colors: IColor[];
}

export const ColorSection: React.FC<ColorContainerProps> = ({
  title,
  colors,
}) => (
  <section>
    <StyledTitle>{title}</StyledTitle>
    {colors.length === 0 ? (
      <NoColorsText>no colors yet</NoColorsText>
    ) : (
      <StyledColorContainer>
        {colors.map(({ id, ...rest }) => (
          <Color key={id} {...rest} toggleIsFavorite={console.log} />
        ))}
      </StyledColorContainer>
    )}
  </section>
);

const StyledTitle = styled.p`
  font-family: PP Neue Machina;
  font-weight: 400;
  font-size: 14px;
  color: #707482;
  padding-left: 4px;
  text-transform: uppercase;
`;

const NoColorsText = styled(StyledTitle)`
  text-align: center;
  font-size: 10px;
  padding: 12px 0;
`;

const StyledColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6px;
`;