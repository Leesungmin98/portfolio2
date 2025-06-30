document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  });
});
