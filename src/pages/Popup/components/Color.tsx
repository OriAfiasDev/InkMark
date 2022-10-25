import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdDone } from 'react-icons/md';
import { FavoriteIcon } from './FavoriteIcon';
import { IColor } from '../types/IColor';
import { incrementUsage } from '../../../utils/syncStorage';

interface ColorProps {
  color: IColor;
  toggleIsFavorite: (colorId: string) => void;
}

export const Color: React.FC<ColorProps> = ({ color, toggleIsFavorite }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target === e.currentTarget) {
        navigator.clipboard.writeText(color.color || '#fff');
        setIsCopied(true);
        incrementUsage(color.id);
      }
    },
    [color]
  );

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);

  return (
    <>
      <StyledColor color={color.color || '#fff'} onClick={copyToClipboard}>
        {isCopied && <StyledCopiedIcon color={color.color || '#fff'} />}
        <FavoriteIcon
          color={color.color || '#fff'}
          isFavorite={color.isFavorite}
          toggleFavorite={() => toggleIsFavorite(color.id)}
        />
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
  border: 1px solid #e5e6ea;
  background: ${({ color }) => color};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
