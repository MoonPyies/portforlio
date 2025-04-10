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
  "Art/image10.gif" 
];
  const video = "Video/sample.mp4";
  const galleryImage = document.getElementById("gallery-image");
  const galleryVideo = document.getElementById("gallery-video");
  let currentIndex = 0;
  let videoPlayed = false;

const descriptions = [
   "Image 1 : Fait le 27/03/2025, le dessin a pour thème la nostalgie, il représente un menu de DS (picto-chat) avec un chat sur le coté. J'ai choisi ça car la DS est je pense une bonne representation pour une enfance dont quelqu'un peut être nostalgique, de même pour le chat. ",
  "Image 2 : Fait le 27/03/2025, le dessin a pour thème comme le précedent, la nostalgie. Celui ci est plus personel que les autres car quand je pense a la nostalgie je pense aux furby car ils ont eu une grande place dans mon enfance. Je les ai toujours trouvé intéressant.",
  "Image 3 : Fait le 30/03/2025, j'ai énormément apprécié faire celui ci, majoritairement parce que j'adore les bourdons et j'ai toujours voulu en dessiner, je pense qu'il fait parti avec le dernier, de l'un de mes préférés. Il fait parti de la catégorie 'Hope Core' l'un de mes core préférés.",
  "Image 4 : Fait le 11/017/2024, je ne me souviens plus trop de celui-ci, cependant je sais qu'il mentionne l'enfance avec le furby mais aussi le 'very hungry caterpillar' qui au moment ou j'ai fait le dessin revenais un peu a la mode.",
  "Image 5 : Fait le 01/06/2025, celui a pour thème pokémon et les clown, a cette période là je me suis essayé a dessiner des clowns, j'ai fait Sonic, Amy, Métal Sonic et le Original Character de quelqu'un en ligne qui m'en avait demander un.",
  "Image 6 : Fait le 24/10/24, je l'ai fait lors de L'INKTOBER, le thème donner était 'Self-care', du coup j'ai pensé a quelqu'un nettoyant et appréciant des vétements propre. Le personnage est mon OC",
  "Image 7 : Fait le 02/10/24, il est lui aussi issue de mon INKTOBER, le thème était 'Pumkin' et j'ai donc déssiner une citrouille avec Jybanian sous sa forme de chat qui est un Yokai dans Yokai-Watch.",
  "Image 8 : Fait le 28/01/25, celui-ci est un plus abstrait, j'ai dessiner une représentation personel d'une sorte de paranoia, un nid d'yeux qui vous observe de haut et qui vous surplombe de manière imposante..",
  "Image 9 : Fait le 12/10/24, je l'ai fait durant le INKTOBER, il représente un chat qui est issue de l'un de mes artistes préférés : Louis Wain, j'ai essayé de refaire un de ses déssins dans 'mon style'.",
  "Image 10 :Fait le 18/01/25, c'est un écran d'attente pour mes stream quand ils vont bientot démarrer. Le chien provient de Duck Hunt, j'ai refait l'animation de celui-ci. Le fond est un écran de Gambeboy",
  "Vidéo : Fait le --/01/25, c'est un mod du personnage de Lloyd provenant de Ninjago, c'est pour le jeu Rivals of Aether et il est toujours en cours de confections."
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

