let url= "https://m91u957388.goho.co"
// 初始化场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);
document.body.appendChild(renderer.domElement);

// 设置轨道控制
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// 设置灯光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);
//网格
const gridHelper = new THREE.GridHelper(20, 20,0x444444, 0x606060);
scene.add(gridHelper);
// 设置相机位置
camera.position.set(20, 10, 20);

function fetchPLYFile(){
    console.log("fetchPLYFile");
}
//页面加载从后端选取文件完成自动渲染
document.addEventListener('DOMContentLoaded', ()=> {
    loadPLYFromURL();
    console.log("DOMContentLoaded");
  });

  function gaussianSplash(geometry) {
    const positions = geometry.attributes.position.array;
    const colors = geometry.attributes.color ? geometry.attributes.color.array : null;

    // 创建新的几何体
    const newGeometry = new THREE.BufferGeometry();
    const newPositions = [];
    const newColors = [];

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // 生成高斯扰动
        const offsetX = (Math.random() - 0.5) * 0.07;
        const offsetY = (Math.random() - 0.5) * 0.07;
        const offsetZ = (Math.random() - 0.5) * 0.07;

        newPositions.push(x + offsetX, y + offsetY, z + offsetZ);

        if (colors) {
            newColors.push(colors[i], colors[i + 1], colors[i + 2]);
        }
    }

    newGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));

    if (colors) {
        newGeometry.setAttribute('color', new THREE.Float32BufferAttribute(newColors, 3));
    }

    return newGeometry;
}


  function loadPLYFromURL() {
    axios.get(url + "/edit", { responseType: 'arraybuffer' })
        .then(response => {
            const contents = response.data;
            console.log("Received PLY file data from server:", contents);
            const loader = new THREE.PLYLoader();
            const geo = loader.parse(contents);
            const geometry = gaussianSplash(geo);
            if (geometry.attributes.color) {
                // 假设颜色数据以浮点数形式存储在[0, 1]范围内
                const colors = geometry.attributes.color.array;
                for (let i = 0; i < colors.length; i += 3) {
                    // 可能需要将颜色数据从 [0, 1] 范围转换为 [0, 255] 范围
                    colors[i] *= 255;
                    colors[i + 1] *= 255;
                    colors[i + 2] *= 255;
                }
            }
            // 检查几何体是否有顶点颜色
            let material;
            if (geometry.attributes.color) {
                material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true });
            } else {
                material = new THREE.PointsMaterial({ size: 0.01, color: 0x00ff00 });
            }

            const mesh = new THREE.Points(geometry, material);

            // 居中几何体
            geometry.computeBoundingBox();
            if (geometry.boundingBox) {
                const center = new THREE.Vector3();
                geometry.boundingBox.getCenter(center);
                mesh.position.sub(center);
            }

            scene.add(mesh);
        })
        .catch(error => {
            console.error('Error loading PLY file:', error);
        });
}
//按钮点击本地上传ply进行渲染
function loadPLY(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const contents = event.target.result;
        const loader = new THREE.PLYLoader();
        const geometry = loader.parse(contents);
        console.log("Geometry Attributes:", geometry.attributes);
        // Check if the geometry has vertex colors
        let material;
        if (geometry.attributes.color) {
            material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true });
        } else {
            material = new THREE.PointsMaterial({ size: 0.01, color: 0xbbbbbb });
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
document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.ply')) {
        // Clear previous mesh
        scene.children.forEach((child, index) => {
            if (child instanceof THREE.Points) {
                scene.remove(child);
            }
        });
        loadPLY(file);
    }
});



function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 处理窗口调整大小
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
