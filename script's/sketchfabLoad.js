document.getElementById('loadModel').addEventListener('click', function () {
  const modelId = document.getElementById('modelSelect').value;
  loadModel(modelId);
});

function loadModel(modelId) {
  const url = `https://api.sketchfab.com/v3/models/${modelId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'eae108b2ff6b41b2a040a24e34b21ce7'
    }
  })
    .then(data => {
      const iframe = document.getElementById('sketchfab-embed');
      iframe.src = `https://sketchfab.com/models/${modelId}/embed`;
    })
    .catch(error => console.error('Ошибка:', error));
}
loadModel(document.getElementById('modelSelect').value);
