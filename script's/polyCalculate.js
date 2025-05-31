document.addEventListener('DOMContentLoaded', function () {
  M.AutoInit();
  document.getElementById('calculate-btn').addEventListener('click', calculatePolygons);
  document.getElementById('reset-btn').addEventListener('click', resetForm);
});

function calculatePolygons() {
  const faceCount = parseInt(document.getElementById('face-count').value) || 0;
  const triangleCount = parseInt(document.getElementById('triangle-count').value) || 0;

  const totalPolygons = faceCount + triangleCount;

  let modelType;
  if (totalPolygons < 5000) {
    modelType = "Low Poly";
  }
  else if (totalPolygons >= 5000 && totalPolygons <= 100000) {
    modelType = "Medium Poly";
  }
  else {
    modelType = "High Poly";
  }

  document.getElementById('total-polygons').textContent = totalPolygons;
  document.getElementById('model-type').textContent = modelType;
  document.getElementById('result-card').style.display = 'block';
}

function resetForm() {
  document.getElementById('face-count').value = '';
  document.getElementById('triangle-count').value = '';
  document.getElementById('result-card').style.display = 'none';
}
