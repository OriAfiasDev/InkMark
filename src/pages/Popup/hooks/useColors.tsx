import { useEffect, useMemo, useState } from 'react';
import { getColors, listenToColors } from '../../../utils/syncStorage';
import { IColor } from '../types/IColor';

export const useColors = () => {
  const [colors, setColors] = useState<IColor[]>([]);

  useEffect(() => {
    getColors().then((colors) => {
      setColors(colors);
    });
    listenToColors(setColors);
  }, []);

  const favorites = useMemo(
    () => colors.filter(({ isFavorite }) => isFavorite),
    [colors]
  );

  const mostCommon = useMemo(
    () => [...colors].sort((a, b) => b.count - a.count).slice(0, 4),
    [colors]
  );

  const solids = useMemo(
    () => colors.filter((color) => color.type === 'solid'),
    [colors]
  );

  const gradients = useMemo(
    () => colors.filter((color) => color.type === 'gradient'),
    [colors]
  );

  return { colors, favorites, mostCommon, solids, gradients };
};
