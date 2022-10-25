const nav = document.getElementById("control");
const start = document.getElementById("startEngine");
const burger = document.getElementById("burger");

function toggleMenu() {
  if( burger.classList.contains('open') ) {
    closeMenu();
  }
  else{
    openMenu();
  }
}

function openMenu() {
  nav.classList.add('control--active');
  burger.classList.add('open');
}
function closeMenu() {
  nav.classList.remove('control--active');
  burger.classList.remove('open');
}

burger.onclick = toggleMenu;
start.onclick = closeMenu;