// global js stuff goes here

const navMenu = (function(window) {
  const menuBtn = document.querySelector('.btn-menu');
  const menu = document.querySelector('.menu');
  const menuNav = document.querySelector('.menu-nav');
  const navItems = document.querySelectorAll('.nav-item');

  let showMenu = false;

  menuBtn.addEventListener('click', toggleMenu);

  function toggleMenu(){
    if(!showMenu){
      menuBtn.classList.add('close');
      menu.classList.add('show');
      menuNav.classList.add('show');
      navItems.forEach(item => item.classList.add('show'));

      showMenu = true;
    } else {
      menuBtn.classList.remove('close');
      menu.classList.remove('show');
      menuNav.classList.remove('show');
      navItems.forEach(item => classList.remove('show'));

      showMenu = false;
    }
  }
}(window));
