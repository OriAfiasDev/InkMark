export const childIdBackground = 'CHILD_ID_BACKGROUND';
export const childIdColor = 'CHILD_ID_COLOR';

const saveOnSyncStorage = (savedColor) => {
  chrome.storage.local.get({ savedColors: [] }, ({ savedColors }) => {
    chrome.storage.local.set({ savedColors: [...savedColors, savedColor] });
  });
};

const getColorsFromElement = ({ menuItemId, frameId }, tab) => {
  if (![childIdBackground, childIdColor].includes(menuItemId)) return;
  const eventId = `getClickedEl-${menuItemId}`;

  chrome.tabs.sendMessage(tab.id, eventId, { frameId }, saveOnSyncStorage);
};

chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({
    id: 'root',
    title: 'Hex marks',
    contexts: ['all'],
  });

  chrome.contextMenus.create({
    id: childIdBackground,
    parentId: 'root',
    title: 'Save background',
    contexts: ['all'],
  });

  chrome.contextMenus.create({
    id: childIdColor,
    parentId: 'root',
    title: 'Save Color',
    contexts: ['all'],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) =>
    getColorsFromElement(info, tab)
  );
});
