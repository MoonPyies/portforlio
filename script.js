document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startupScreen = document.getElementById("startup-screen");
  const startupSound = document.getElementById("startup-sound");
  const desktop = document.getElementById("desktop");
  const wallpaperContainer = document.getElementById("wallpaper-container");
  const fullscreenOverlay = document.getElementById("fullscreen-overlay");
  const fullscreenImg = document.getElementById("fullscreen-img");
  const closeFullscreen = document.getElementById("close-fullscreen");
  const videoOverlay = document.getElementById("video-overlay");
  const fullscreenVideo = document.getElementById("fullscreen-video");
  const closeVideoFullscreen = document.getElementById("close-video-fullscreen");


  startBtn.addEventListener("click", () => {
    document.getElementById("startup-prompt").style.display = "none";
    startupScreen.style.display = "flex";
    startupSound.play();
    setTimeout(() => {
      startupScreen.style.display = "none";
      desktop.style.display = "block";
    }, 8000);
  });

  // bouge les fenetres la
  document.querySelectorAll(".window").forEach(win => {
    const titleBar = win.querySelector(".title-bar");
    let offsetX, offsetY, isDragging = false;

    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = win.getBoundingClientRect();
      const containerRect = wallpaperContainer.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      const onMouseMove = (e) => {
        if (!isDragging) return;

        let x = e.clientX - offsetX - containerRect.left;
        let y = e.clientY - offsetY - containerRect.top;

        const maxX = wallpaperContainer.clientWidth - win.offsetWidth;
        const maxY = wallpaperContainer.clientHeight - win.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        win.style.left = x + "px";
        win.style.top = y + "px";
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });

  // l'art
  const images = [
  "Art/image1.png",
  "Art/image2.png",
  "Art/image3.png",
  "Art/image4.png",
  "Art/image5.png",
  "Art/image6.png",
  "Art/image7.png",
  "Art/image8.png",
  "Art/image9.png",
  "Art/image10.gif" // <- Use a GIF here
];
  const video = "Video/sample.mp4";
  const galleryImage = document.getElementById("gallery-image");
  const galleryVideo = document.getElementById("gallery-video");
  let currentIndex = 0;
  let videoPlayed = false;

const descriptions = [
  "Image 1 : Ceci est une description.",
  "Image 2 : Une autre belle image.",
  "Image 3 : Rétro vibes à fond.",
  "Image 4 : Look Windows 98 classique.",
  "Image 5 : Détails pixel art.",
  "Image 6 : Composition minimaliste.",
  "Image 7 : Couleurs pastels douces.",
  "Image 8 : Expérience utilisateur rétro.",
  "Image 9 : Nostalgie pure.",
  "Image 10 : Dernière image avant vidéo.",
  "Vidéo : Animation ou démonstration en action."
];

const descriptionEl = document.getElementById("gallery-description");

function updateGallery() {
  if (currentIndex < images.length) {
    galleryImage.src = images[currentIndex];
    galleryImage.style.display = "block";
    galleryVideo.pause();
    galleryVideo.style.display = "none";
  } else {
    galleryImage.style.display = "none";
    galleryVideo.src = video;
    galleryVideo.style.display = "block";
    if (!videoPlayed) {
      galleryVideo.play();
      videoPlayed = true;
    }
  }

  descriptionEl.textContent = descriptions[currentIndex];
}

  document.querySelector(".gallery-arrow.left").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery();
    }
  });
  

  
  document.querySelector(".gallery-arrow.right").addEventListener("click", () => {
    if (currentIndex < images.length) {
      currentIndex++;
      updateGallery();
    }
  });

  galleryImage.addEventListener("click", () => {
    fullscreenImg.src = galleryImage.src;
    fullscreenOverlay.style.display = "flex";
  });

  closeFullscreen.addEventListener("click", () => {
    fullscreenOverlay.style.display = "none";
    fullscreenImg.src = "";
  });

  fullscreenOverlay.addEventListener("click", () => {
    fullscreenOverlay.style.display = "none";
    fullscreenImg.src = "";
  });

  galleryVideo.addEventListener("click", () => {
    fullscreenVideo.src = galleryVideo.src;
    videoOverlay.style.display = "flex";
  });

  closeVideoFullscreen.addEventListener("click", () => {
    videoOverlay.style.display = "none";
    fullscreenVideo.pause();
    fullscreenVideo.src = "";
  });

  videoOverlay.addEventListener("click", () => {
    videoOverlay.style.display = "none";
    fullscreenVideo.pause();
    fullscreenVideo.src = "";
  });

  updateGallery();

  document.querySelectorAll('.taskbar-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const win = document.getElementById(targetId);

    const isMinimized = win.style.display === 'none';


    win.style.display = isMinimized ? 'block' : 'none';


    if (isMinimized) {
      win.style.zIndex = '15';

      document.querySelectorAll('.window').forEach(otherWin => {
        if (otherWin !== win) otherWin.style.zIndex = '10';
      });
    }

    button.classList.toggle('active', isMinimized);
  });
  });
  const targetId = button.getAttribute('data-target');
const win = document.getElementById(targetId);



});

