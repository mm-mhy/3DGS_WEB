// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Set up lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Set up camera position
camera.position.z = 5;

// Function to load and display PLY file
function loadPLY(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const contents = event.target.result;
        const loader = new THREE.PLYLoader();
        const geometry = loader.parse(contents);

        // Check if the geometry has vertex colors
        let material;
        if (geometry.attributes.color) {
            material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true });
        } else {
            material = new THREE.PointsMaterial({ size: 0.01, color: 0x00ff00 });
        }

        const mesh = new THREE.Points(geometry, material);

        // Center the geometry
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);
        mesh.position.sub(center);

        scene.add(mesh);
    };
    reader.readAsArrayBuffer(file);
}

// Handle file upload
document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.ply')) {
        // Clear previous mesh
        while (scene.children.length > 1) {
            scene.remove(scene.children[1]);
        }
        loadPLY(file);
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
