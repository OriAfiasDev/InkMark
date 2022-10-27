import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { colorScheme } from '../globalStyles/colorScheme';
import { VscChevronRight } from 'react-icons/vsc';

interface SectionProps {
  title: string;
  isOpenDefault?: boolean;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  isOpenDefault = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDefault);
  return (
    <section>
      <StyledTitle>
        <Collapse isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
        {title}
      </StyledTitle>
      {isOpen && children}
    </section>
  );
};

export const StyledTitle = styled.p`
  font-family: PP Neue Machina;
  font-weight: 400;
  font-size: 14px;
  color: ${colorScheme.dark.text};
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

const Collapse = styled(VscChevronRight)<{ isOpen: boolean }>`
  cursor: pointer;
  transform: rotate(${({ isOpen }) => (isOpen ? '90deg' : '0deg')});
  transition: transform 300ms ease-in-out;
  padding: 2px;
  margin: -2px;
  margin-right: 4px;
`;