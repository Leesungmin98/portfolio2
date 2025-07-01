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
      const texts = ['HELLO', '안녕하세요'];
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


//////////////////////////////////////////////////////////////////////////

// document.addEventListener("DOMContentLoaded", () => {
//   const leftButtons = document.querySelectorAll('.left-button > div');
//   const mainBoxes = document.querySelectorAll('.main-box');

//   leftButtons.forEach((button, index) => {
//     button.addEventListener('click', () => {
//       // 모든 버튼에서 active 제거
//       leftButtons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');

//       // 모든 main-box에서 active 제거 (자연스럽게 페이드아웃)
//       mainBoxes.forEach((box, i) => {
//         if (i === index) {
//           box.classList.add('active'); // 페이드인
//         } else {
//           box.classList.remove('active'); // 페이드아웃
//         }
//       });

//       // 모든 비디오 멈춤 + 초기화
//       const videos = document.querySelectorAll('video');
//       videos.forEach(video => {
//         video.pause();
//         video.currentTime = 0;
//       });
//     });
//   });
// });

/////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const leftButtons = document.querySelectorAll(".left-button > div");
  const mainBoxes = document.querySelectorAll(".main-box");
  let currentIndex = 0;

  leftButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === currentIndex) return;

      // 버튼 상태 전환
      leftButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const currentBox = mainBoxes[currentIndex];
      const nextBox = mainBoxes[index];

      // 현재 박스 페이드 아웃
      fadeOut(currentBox, () => {
        // 다음 박스 페이드 인
        fadeIn(nextBox);
        currentIndex = index;
      });

      // 비디오 모두 정지 및 리셋
      document.querySelectorAll("video").forEach(video => {
        video.pause();
        video.currentTime = 0;
      });
    });
  });

  // 처음은 첫 박스만 보이게
  mainBoxes.forEach((box, i) => {
    if (i === 0) {
      box.style.display = "block";
      box.style.opacity = 1;
    } else {
      box.style.display = "none";
      box.style.opacity = 0;
    }
  });
});

function fadeOut(element, callback) {
  let opacity = 1;
  const duration = 500;
  const interval = 20;
  const gap = interval / duration;

  function animate() {
    opacity -= gap;
    if (opacity <= 0) {
      opacity = 0;
      element.style.opacity = 0;
      element.style.display = "none";
      if (callback) callback();
    } else {
      element.style.opacity = opacity;
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function fadeIn(element) {
  let opacity = 0;
  const duration = 500;
  const interval = 20;
  const gap = interval / duration;

  element.style.display = "block";
  element.style.opacity = 0;

  function animate() {
    opacity += gap;
    if (opacity >= 1) {
      opacity = 1;
      element.style.opacity = 1;
    } else {
      element.style.opacity = opacity;
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
} // 페이지 전환

///////////////////

