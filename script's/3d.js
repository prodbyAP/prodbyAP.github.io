document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  
  const container = document.getElementById('3d-container');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(750, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const loader = new THREE.GLTFLoader();
  let mixer;

  loader.load(
    '../model/animation.glb',
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.x += (model.position.x - center.x);
      model.position.y += (model.position.y - center.y);
      model.position.z += (model.position.z - center.z);

      camera.position.z = box.getSize(new THREE.Vector3()).length() * 1.5;
      camera.lookAt(center);
    },
  );

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
