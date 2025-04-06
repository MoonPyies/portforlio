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

  // Launch startup sequence
  startBtn.addEventListener("click", () => {
    document.getElementById("startup-prompt").style.display = "none";
    startupScreen.style.display = "flex";
    startupSound.play();
    setTimeout(() => {
      startupScreen.style.display = "none";
      desktop.style.display = "block";
    }, 4000);
  });

  // Window dragging
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

  // Gallery
  const images = Array.from({ length: 10 }, (_, i) => `Art/image${i + 1}.png`);
  const video = "Video/sample.mp4";
  const galleryImage = document.getElementById("gallery-image");
  const galleryVideo = document.getElementById("gallery-video");
  let currentIndex = 0;
  let videoPlayed = false;

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
});