var clickedEl = null;

document.addEventListener('contextmenu', function (event) {
  clickedEl = event.target;
});

const findElementColor = () => {
  if (!clickedEl) return null;

  const { color, background, backgroundColor, backgroundImage } =
    getComputedStyle(clickedEl);
  let bg = null;
  if (backgroundImage.includes('linear-gradient')) {
    bg = backgroundImage;
  } else {
    bg = backgroundColor || background;
  }

  return {
    color: color || '#fff',
    bg,
  };
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.includes('getClickedEl')) {
    const { color, bg } = findElementColor();

    return sendResponse(request.includes('CHILD_ID_BACKGROUND') ? bg : color);
  }
  sendResponse(null);
});
