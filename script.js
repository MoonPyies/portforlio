// Startup logic
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("startup-prompt").style.display = "none";
  document.getElementById("startup-screen").style.display = "flex";

  const sound = document.getElementById("startup-sound");
  sound.play().catch(err => {
    console.warn("Sound error:", err);
  });

  setTimeout(() => {
    document.getElementById("startup-screen").style.display = "none";
    document.getElementById("desktop").style.display = "flex";
  }, 7500); // 7.5 seconds to match sound duration
});

// Drag logic for windows
document.querySelectorAll('.window').forEach(win => {
  const titleBar = win.querySelector('.title-bar');
  titleBar.addEventListener('mousedown', (e) => {
    let shiftX = e.clientX - win.getBoundingClientRect().left;
    let shiftY = e.clientY - win.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      const bounds = document.getElementById('wallpaper-container').getBoundingClientRect();
      let newLeft = pageX - shiftX;
      let newTop = pageY - shiftY;

      newLeft = Math.max(bounds.left, Math.min(newLeft, bounds.right - win.offsetWidth));
      newTop = Math.max(bounds.top, Math.min(newTop, bounds.bottom - win.offsetHeight));

      win.style.left = (newLeft - bounds.left) + 'px';
      win.style.top = (newTop - bounds.top) + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  });
});

// Fake close button
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("Fake close clicked");
  });
});


// Gallery Logic
const images = Array.from({ length: 10 }, (_, i) => `Art/image${i + 1}.png`);
let currentImageIndex = 0;

const galleryImg = document.getElementById('gallery-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  galleryImg.src = images[currentImageIndex];
});

nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  galleryImg.src = images[currentImageIndex];
});

galleryImg.addEventListener('click', () => {
  const fullImg = document.getElementById('fullscreen-img');
  fullImg.src = galleryImg.src;
  document.getElementById('fullscreen-overlay').style.display = 'flex';
});

document.getElementById('close-fullscreen').addEventListener('click', () => {
  document.getElementById('fullscreen-overlay').style.display = 'none';
});


// Video Button & Fullscreen
const videoBtn = document.getElementById('video-btn');
const workVideo = document.getElementById('work-video');
const videoOverlay = document.getElementById('video-overlay');
const fullscreenVideo = document.getElementById('fullscreen-video');
const closeVideoBtn = document.getElementById('close-video-fullscreen');

videoBtn.addEventListener('click', () => {
  workVideo.style.display = 'block';
});

workVideo.addEventListener('click', () => {
  fullscreenVideo.src = workVideo.src;
  videoOverlay.style.display = 'flex';
});

closeVideoBtn.addEventListener('click', () => {
  fullscreenVideo.pause();
  videoOverlay.style.display = 'none';
});
