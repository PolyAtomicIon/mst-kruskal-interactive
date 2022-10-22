const nav = document.getElementById("control");
const closeBtn = document.getElementById("close");

function showMenu() {
    const btn = document.getElementById("burger");
    btn.onclick = () => {
        nav.classList.add('control--active');
    closeBtn.style.display = 'flex';
  };
  }
function closeMenu() {
    closeBtn.onclick = () => {
      closeBtn.style.display = 'none';
      nav.classList.remove('control--active');
    };
  }

showMenu();
closeMenu();