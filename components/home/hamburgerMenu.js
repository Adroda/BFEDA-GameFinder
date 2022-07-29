const burgerMenu = document.querySelector('.burgerMenu__btn');
const closeBtn = document.querySelector('.closeBurgerDropdown');

burgerMenu.addEventListener('click', () => {
  const burgerDropdown = document.querySelector('.burgerMenuDropdown');
  burgerDropdown.classList.toggle('hide');
});

closeBtn.addEventListener('click', () => {
  const burgerDropdown = document.querySelector('.burgerMenuDropdown');
  burgerDropdown.classList.toggle('hide');
});
