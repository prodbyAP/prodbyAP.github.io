function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

window.onload = function () {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    setTheme(savedTheme);
  }

  else {
    setTheme('light');
  }

};

document.getElementById('theme-toggle').addEventListener('click', function () {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

document.getElementById('reset-theme').addEventListener('click', function () {
  localStorage.removeItem('theme');
  setTheme('light');
});

document.getElementById('location-button').addEventListener('click', function () {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      document.getElementById('location-output').textContent = `Широта: ${latitude}, Долгота: ${longitude}`;
    },

      function () {
        document.getElementById('location-output').textContent = 'Местоположение не определенно.';
      });

  }
});
