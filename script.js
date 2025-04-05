window.onload = function () {
  const startup = document.getElementById('startup-screen');
  const desktop = document.getElementById('desktop');

  setTimeout(() => {
    startup.style.display = 'none';
    desktop.style.display = 'block';
  }, 4000); // 4 seconds animation

  const windows = document.querySelectorAll('.window');
  windows.forEach(win => {
    const titleBar = win.querySelector('.title-bar');

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    titleBar.addEventListener('mousedown', (e) => {
      isDragging = true;

      const winRect = win.getBoundingClientRect();
      const desktopRect = desktop.getBoundingClientRect();

      offsetX = e.clientX - winRect.left + desktopRect.left;
      offsetY = e.clientY - winRect.top + desktopRect.top;

      desktop.addEventListener('mousemove', onMouseMove);
      desktop.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      if (!isDragging) return;

      const desktopRect = desktop.getBoundingClientRect();

      let x = e.clientX - desktopRect.left - (offsetX - desktopRect.left);
      let y = e.clientY - desktopRect.top - (offsetY - desktopRect.top);

      const maxX = desktop.clientWidth - win.offsetWidth;
      const maxY = desktop.clientHeight - win.offsetHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      win.style.left = x + 'px';
      win.style.top = y + 'px';
    }

    function onMouseUp() {
      isDragging = false;
      desktop.removeEventListener('mousemove', onMouseMove);
      desktop.removeEventListener('mouseup', onMouseUp);
    }
  });
};

// Close button behavior (fake for now)
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Do nothing — just a fake close button!
    console.log("Fake close clicked");
  });
});

// Prevent dragging if clicking inside window controls
document.querySelectorAll('.window-controls button').forEach(btn => {
  btn.addEventListener('mousedown', (e) => e.stopPropagation());
});
