document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  });
}); // 메뉴 버튼

//////////////////////////////////////////////////////////////

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // 0시는 12로 표시

  const currentTime = `Korea | ${hours}:${minutes} ${ampm}`;
  document.getElementById('clock').textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock(); // 시계

//////////////////////////////////////////////////////////

  document.addEventListener('DOMContentLoaded', () => {
      const glitchText = document.getElementById('glitchText');
      const texts = ['Hello', '안녕하세요'];
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789가나다라마바사아자차카타파하!@#$%^&*()-_+=~';
      let currentIndex = 0;

      function glitchChar(toChar, duration = 300, interval = 30) {
        return new Promise(resolve => {
          let elapsed = 0;
          const glitchInterval = setInterval(() => {
            const randChar = charset.charAt(Math.floor(Math.random() * charset.length));
            resolve(randChar); // 최종 글자가 아닌, 업데이트용 콜백
            elapsed += interval;
            if (elapsed >= duration) {
              clearInterval(glitchInterval);
              resolve(toChar); // 최종 문자 확정
            }
          }, interval);
        });
      }

      async function glitchEffect(from, to, callback) {
        const maxLen = Math.max(from.length, to.length);
        let outputArr = Array(maxLen).fill(' ');
        
        for (let i = 0; i < maxLen; i++) {
          const targetChar = to[i] || ' ';
          const finalChar = await new Promise(resolve => {
            const interval = setInterval(() => {
              const randChar = charset.charAt(Math.floor(Math.random() * charset.length));
              outputArr[i] = randChar;
              glitchText.textContent = outputArr.join('');
            }, 30);

            setTimeout(() => {
              clearInterval(interval);
              outputArr[i] = targetChar;
              glitchText.textContent = outputArr.join('');
              resolve(targetChar);
            }, 300 + i * 80); // 점점 길게 확정되게
          });
        }

        if (callback) setTimeout(callback, 2000); // 다 끝난 후 다음 텍스트로 넘어가기
      }

      function loopGlitch() {
        const from = texts[currentIndex];
        const to = texts[(currentIndex + 1) % texts.length];

        glitchEffect(from, to, () => {
          currentIndex = (currentIndex + 1) % texts.length;
          loopGlitch();
        });
      }

      // 시작
      setTimeout(loopGlitch, 1100);
    }); // 글자 랜덤 변환

    //////////////////////////////////////////////////////////////
    