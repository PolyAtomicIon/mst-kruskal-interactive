const nav = document.getElementById("control");
const closeBtn = document.getElementById("close");
const start = document.getElementById("startEngine");

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
    function startEngine() {
      start.onclick = () => {
        closeBtn.style.display = 'none';
        nav.classList.remove('control--active');
        };
      }

showMenu();
closeMenu();
startEngine();