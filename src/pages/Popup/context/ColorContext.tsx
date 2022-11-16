import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react';
import { getColors, listenToColors } from '../../../utils/syncStorage';
import { IColor } from '../types/IColor';

type Tags = { [tagName: string]: IColor[] };

interface ColorContextProps {
  colors: IColor[];
  favorites: IColor[];
  mostCommon: IColor[];
  tags: Tags;
}

const initialContext: ColorContextProps = {
  colors: [],
  favorites: [],
  mostCommon: [],
  tags: {},
};

const ColorContext = createContext<ColorContextProps>(initialContext);

const ColorProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
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

  const tags = useMemo(() => {
    return colors.reduce<Tags>((tags, currentColor) => {
      const colorTag = currentColor.tag.toLowerCase();
      if (!colorTag) return tags;

      if (!tags[colorTag]) tags[colorTag] = [];

      return {
        ...tags,
        [colorTag]: [...tags[colorTag], currentColor],
      };
    }, {});
  }, [colors]);

  return (
    <ColorContext.Provider value={{ colors, favorites, mostCommon, tags }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => useContext(ColorContext);

export default ColorProvider;
