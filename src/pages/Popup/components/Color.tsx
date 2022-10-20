import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdDone } from 'react-icons/md';
import { FavoriteIcon } from './FavoriteIcon';

interface ColorProps {
  color?: string;
  isFavorite?: boolean;
  toggleIsFavorite: () => void;
}

export const Color: React.FC<ColorProps> = ({
  color = '#fff',
  isFavorite = false,
  toggleIsFavorite,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target === e.currentTarget) {
        navigator.clipboard.writeText(color);
        setIsCopied(true);
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
      <StyledColor color={color} onClick={copyToClipboard}>
        <StyledCopiedIcon color={color} isCopied={isCopied} />
        <FavoriteIcon
          color={color}
          isFavorite={isFavorite}
          toggleFavorite={toggleIsFavorite}
        />
      </StyledColor>
    </>
  );
};

const StyledCopiedIcon = styled(MdDone)<{ color: string; isCopied: boolean }>`
  color: ${({ color }) => color};
  height: 24px;
  width: 24px;
  opacity: ${({ isCopied }) => (isCopied ? 1 : 0)};
  transition: opacity 300ms ease;
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
