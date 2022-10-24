import { childIdBackground } from '../Background';

var clickedEl = null;

document.addEventListener('contextmenu', function (event) {
  clickedEl = event.target;
});

const findElementColor = () => {
  if (!clickedEl) return null;

  const { color, background, backgroundColor } = getComputedStyle(clickedEl);
  return { color, bg: background || backgroundColor };
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.includes('getClickedEl')) {
    const { color, bg } = findElementColor();

    sendResponse(request.includes(childIdBackground) ? bg : color);
  }
});
