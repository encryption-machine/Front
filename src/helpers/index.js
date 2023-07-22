export const copyToClipboard = (value) => {
  const textArea = document.createElement('textarea');
  textArea.value = value;
  document.body.appendChild(textArea);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    textArea.readOnly = true;

    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    if (selection === null) return;
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
  const successful = document.execCommand('copy');
  textArea.remove();
  if (!successful) {
    throw new Error('Копирование в буфер обмена недоступно в этом браузере');
  }
};
