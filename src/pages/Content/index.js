var clickedEl = null;

document.addEventListener('contextmenu', function (event) {
  clickedEl = event.target;
});

const findElementColor = () => {
  if (!clickedEl) return null;

  const { color, background, backgroundColor } = getComputedStyle(clickedEl);
  return {
    color: color || '#fff',
    bg: background || backgroundColor || '#eee',
  };
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.includes('getClickedEl')) {
    const { color, bg } = findElementColor();

    return sendResponse(request.includes('CHILD_ID_BACKGROUND') ? bg : color);
  }
  sendResponse(null);
});
