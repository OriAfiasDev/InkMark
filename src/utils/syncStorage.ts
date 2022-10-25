import { v4 as uuid } from 'uuid';
import { IColor } from '../pages/Popup/types/IColor';

export const addNewColor = (color: string) => {
  const newColor: IColor = {
    id: uuid(),
    color,
    isFavorite: false,
    type: color.includes('linear-gradient') ? 'gradient' : 'solid',
    count: 0,
  };

  chrome.storage.sync.get({ savedColors: [] }, ({ savedColors }) => {
    chrome.storage.sync.set({ savedColors: [...savedColors, newColor] });
  });
};

export const getColors = async () => {
  const { savedColors } = await chrome.storage.sync.get('savedColors');
  return savedColors || [];
};

export const resetColors = () => {
  chrome.storage.sync.set({ savedColors: [] });
};

export const removeColor = (id: string) => {
  chrome.storage.sync.get({ savedColors: [] }, ({ savedColors }) => {
    chrome.storage.sync.set({
      savedColors: savedColors.filter((color: IColor) => color.id !== id),
    });
  });
};

export const toggleFavorite = (id: string) => {
  chrome.storage.sync.get({ savedColors: [] }, ({ savedColors }) => {
    chrome.storage.sync.set({
      savedColors: savedColors.map((color: IColor) =>
        color.id === id ? { ...color, isFavorite: !color.isFavorite } : color
      ),
    });
  });
};

export const incrementUsage = (id: string) => {
  chrome.storage.sync.get({ savedColors: [] }, ({ savedColors }) => {
    chrome.storage.sync.set({
      savedColors: savedColors.map((color: IColor) =>
        color.id === id ? { ...color, count: color.count + 1 } : color
      ),
    });
  });
};
