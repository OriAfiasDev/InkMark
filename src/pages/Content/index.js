var clickedEl = null;

document.addEventListener('contextmenu', function (event) {
  clickedEl = event.target;
});

const isTransparent = (color) => {
  if (color.startsWith('rgba')) {
    const [, , , a] = color.split(',');
    return a === ' 0)';
  }
  if (color.startsWith('hsla')) {
    const [, , , a] = color.split(',');
    return a === ' 0)';
  }
  if (color.startsWith('#')) {
    return color === '#00000000';
  }
  return false;
};

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
      alert('Sorry, No color found');
      return null;
  }
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.includes('getClickedEl')) {
    const color = findElementColor(request);
    if (color && !isTransparent(color)) return sendResponse(color);
    else alert('Sorry, No color found');
  }
  sendResponse(null);
});
