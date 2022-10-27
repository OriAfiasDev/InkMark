import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDone } from 'react-icons/md';
import { IColor } from '../types/IColor';
import { incrementUsage } from '../../../utils/syncStorage';

interface ColorBoxProps {
  color: IColor;
}

export const copyToClipboard = (color: string, colorId: string) => {
  navigator.clipboard.writeText(color);
  incrementUsage(colorId);
};

export const ColorBox: React.FC<ColorBoxProps> = ({ color }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copyToClipboard(color.color, color.id);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <StyledColor color={color.color} onClick={handleClick}>
        {isCopied && <StyledCopiedIcon color={color.color} />}
      </StyledColor>
    </>
  );
};

const StyledCopiedIcon = styled(MdDone)<{ color: string }>`
  color: ${({ color }) => color};
  height: 24px;
  width: 24px;
  filter: invert(100%);
`;

const StyledColor = styled.div<{ color: string }>`
  position: relative;
  height: 45px;
  width: 60px;
  background: ${({ color }) => color};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
