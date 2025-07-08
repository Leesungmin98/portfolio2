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
      const texts = ['HELLO'];
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789가나다라마바사아자차카타파하!@#$%^&*()-_+=~';
      let currentIndex = 0;

      function glitchChar(toChar, duration = 10, interval = 10) {
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
      setTimeout(loopGlitch, 500);
    }); // 글자 랜덤 변환

    //////////////////////////////////////////////////////////////

///////////////////

document.addEventListener("DOMContentLoaded", () => {
  const leftButtons = document.querySelectorAll(".left-button > div");
  const mainBoxes = document.querySelectorAll(".main-box");
  const worksBoxes = document.querySelectorAll(".works1"); // ← works1 박스 선택
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

      // ✅ works1 박스 display 전환
      worksBoxes.forEach((box, i) => {
        box.style.display = i === index ? "block" : "none";
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

  // 처음엔 works1 중 첫 번째만 보이게
  worksBoxes.forEach((box, i) => {
    box.style.display = i === 0 ? "block" : "none";
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
}
/////////////////////////////////////////////



////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById("loading");
  const mainContent = document.getElementById("mainContent");
  // 시작
  (async () => {
  
    setTimeout(() => {
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
          mainContent.style.opacity = '1';
        }, 50);
      }, 300); // loading opacity transition 시간과 동일
    },300); // glitch 끝난 뒤 약간 멈췄다 사라지게
  })();
});
