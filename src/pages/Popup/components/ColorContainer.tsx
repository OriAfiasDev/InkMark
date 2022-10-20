import React from 'react';
import styled from 'styled-components';

interface ColorContainerProps {
  title: string;
}

export const ColorContainer: React.FC<ColorContainerProps> = ({
  title,
  children,
}) => (
  <section>
    <StyledTitle>{title}</StyledTitle>
    <StyledColorContainer>{children}</StyledColorContainer>
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
