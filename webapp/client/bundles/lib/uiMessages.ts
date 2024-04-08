let messageTimer;

export const showMessage = (msg: string, level: 'success' | 'warning' | 'danger') => {
  if (messageTimer) {
    clearTimeout(messageTimer);
  }
  const a = document.querySelector('.js-message') as HTMLElement;
  a.textContent = msg;
  a.classList.add('message--warning', level);
  const b = document.querySelector('.js-flash-message') as HTMLElement;
  b.style.transform = 'translateY(0px)';
  b.style.visibility = 'visible';
  messageTimer = setTimeout(() => {
    hideMessage();
  }, 5000);
};

export const hideMessage = () => {
  const b = document.querySelector('.js-flash-message') as HTMLElement;
  b.style.transform = 'translateY(-100%)';
};
