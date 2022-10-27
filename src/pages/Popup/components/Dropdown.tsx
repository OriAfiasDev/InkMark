import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { colorScheme } from '../globalStyles/colorScheme';

export const Dropdown: React.FC<PropsWithChildren<any>> = ({ children }) => (
  <DropdownContainer>
    {children}
    <ContentContainer>
      <p>Link 1</p>
      <p>Link 2</p>
      <p>Link 3</p>
    </ContentContainer>
  </DropdownContainer>
);

const arrowPeak = 15;

const ContentContainer = styled.div`
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

  & p {
    color: ${colorScheme.dark.text};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${colorScheme.dark.backgroundSecondaryHover};
    }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    & ${ContentContainer} {
      display: block;
    }
  }
`;
