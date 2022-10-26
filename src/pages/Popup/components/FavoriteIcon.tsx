import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styled from 'styled-components';
import { icon } from '../globalStyles/Icon';

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
  ${({ color }) => icon(color, 'right')}
`;

const FullHeart = styled(AiFillHeart)<{ color: string }>`
  ${({ color }) => icon(color, 'right')}
`;
