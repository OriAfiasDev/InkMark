import React, { ReactNode, useEffect, useState } from 'react';
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

  useEffect(() => {
    setIsOpen(isOpenDefault);
  }, [isOpenDefault]);

  return (
    <section>
      <StyledTitle onClick={() => setIsOpen((prev) => !prev)}>
        <Collapse isOpen={isOpen} />
        {title}
      </StyledTitle>
      {isOpen && children}
    </section>
  );
};

export const StyledTitle = styled.p`
  cursor: pointer;
  font-family: PP Neue Machina;
  font-weight: 400;
  font-size: 14px;
  color: ${colorScheme.dark.text};
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

const Collapse = styled(VscChevronRight)<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => (isOpen ? '90deg' : '0deg')});
  transition: transform 300ms ease-in-out;
  padding: 2px;
  margin: -2px;
  margin-right: 4px;
`;
