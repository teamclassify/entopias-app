function setLocalStorage(item, data) {
  if (localStorage) {
    localStorage.setItem(item, data);
  }
}

function getLocalStorage(item) {
  if (localStorage) {
    return localStorage.getItem(item);
  }

  return null;
}

export { setLocalStorage, getLocalStorage };
