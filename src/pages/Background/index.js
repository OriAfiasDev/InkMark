import { addNewColor } from '../../utils/syncStorage';

const childIdBackground = 'CHILD_ID_BACKGROUND';
const childIdColor = 'CHILD_ID_COLOR';
const childIdFill = 'CHILD_ID_FILL';

const getColorsFromElement = ({ menuItemId, frameId }, tab) => {
  if (![childIdBackground, childIdColor, childIdFill].includes(menuItemId))
    return;
  const eventId = `getClickedEl-${menuItemId}`;

  chrome.tabs.sendMessage(tab.id, eventId, { frameId }, addNewColor);
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

  chrome.contextMenus.create({
    id: childIdFill,
    parentId: 'root',
    title: 'Save Fill',
    contexts: ['all'],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) =>
    getColorsFromElement(info, tab)
  );
});
