var clickedEl = null;

document.addEventListener('contextmenu', function (event) {
  clickedEl = event.target;
});

const findElementColor = (colorType) => {
  if (!clickedEl) return null;

  const { color, background, backgroundColor, backgroundImage, fill } =
    getComputedStyle(clickedEl);

  switch (colorType) {
    case 'getClickedEl-CHILD_ID_COLOR':
      return color;
    case 'getClickedEl-CHILD_ID_BACKGROUND':
      return backgroundImage.includes('linear-gradient')
        ? backgroundImage
        : backgroundColor || background;
    case 'getClickedEl-CHILD_ID_FILL':
      const pathEl = clickedEl.querySelector('path');
      return pathEl ? getComputedStyle(pathEl).fill : fill;
    default:
      return null;
  }
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.includes('getClickedEl')) {
    return sendResponse(findElementColor(request));
  }
  sendResponse(null);
});
