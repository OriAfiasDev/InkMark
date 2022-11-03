import { v4 as uuid } from 'uuid';
import { IColor } from '../pages/Popup/types/IColor';

export const addNewColor = (color: string) => {
  if (!color) return;

  const newColor: IColor = {
    id: uuid(),
    color,
    isFavorite: false,
    type: color.includes('linear-gradient') ? 'gradient' : 'solid',
    count: 0,
    tags: [],
  };

  chrome.storage.sync.get({ savedColors: [] }, ({ savedColors }) => {
    const exists = savedColors.find((c: IColor) => c.color === color);
    if (!exists)
      chrome.storage.sync.set({ savedColors: [...savedColors, newColor] });
  });
};

export const getColors = async (): Promise<IColor[]> => {
  const { savedColors } = await chrome.storage.sync.get('savedColors');
  return savedColors || [];
};

export const listenToColors = (callback: (newValue: IColor[]) => void) => {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace !== 'sync') return;
    callback(changes.savedColors.newValue);
  });
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

export const toggleTag = (id: string, tag: string) => {
  chrome.storage.sync.get({ savedColors: [] }, ({ savedColors }) => {
    chrome.storage.sync.set({
      savedColors: savedColors.map((color: IColor) =>
        color.id === id
          ? {
              ...color,
              tags: color.tags.includes(tag)
                ? color.tags.filter((t) => t !== tag)
                : [...color.tags, tag],
            }
          : color
      ),
    });
  });
};
