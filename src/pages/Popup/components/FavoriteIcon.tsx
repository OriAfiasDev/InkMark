import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styled from 'styled-components';

interface FavoriteIconProps {
  color: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  color,
  isFavorite,
  toggleFavorite,
}) =>
  isFavorite ? (
    <FullHeart color={color} onClick={toggleFavorite} />
  ) : (
    <EmptyHeart color={color} onClick={toggleFavorite} />
  );

const EmptyHeart = styled(AiOutlineHeart)<{ color: string }>`
  color: ${({ color }) => color};
  height: 10px;
  width: 10px;
  filter: invert(100%);
  position: absolute;
  bottom: 6px;
  right: 6px;
  transition: height 300ms ease, width 300ms ease;

  &:hover {
    height: 16px;
    width: 16px;
  }
`;

const FullHeart = styled(AiFillHeart)<{ color: string }>`
  color: ${({ color }) => color};
  height: 10px;
  width: 10px;
  filter: invert(100%);
  position: absolute;
  bottom: 6px;
  right: 6px;
  transition: height 300ms ease, width 300ms ease;

  &:hover {
    height: 16px;
    width: 16px;
  }
`;
