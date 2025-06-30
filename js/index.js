document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  });
}); // 메뉴 버튼

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // 0시는 12로 표시

  const currentTime = `KOREA | ${hours}:${minutes} ${ampm}`;
  document.getElementById('clock').textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock(); // 시계

