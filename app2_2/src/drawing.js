import * as THREE from 'three';

const setupScene = () => new THREE.Scene();
const setupCamera = pref => {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(pref.camera.x, pref.camera.y, pref.camera.z);
  camera.lookAt(0, 0, 0);

  return camera;
};

const getQuadraticBezierPoint = (t, p0, p1, p2) => {
  return {
    x:
      Math.pow(1 - t, 2) * p0.x +
      2 * (1 - t) * t * p1.x +
      Math.pow(t, 2) * p2.x,
    y:
      Math.pow(1 - t, 2) * p0.y +
      2 * (1 - t) * t * p1.y +
      Math.pow(t, 2) * p2.y,
    z:
      Math.pow(1 - t, 2) * p0.z +
      2 * (1 - t) * t * p1.z +
      Math.pow(t, 2) * p2.z,
  };
};

const getCubicBezierPoint = (t, p0, p1, p2, p3) => {
  return {
    x:
      Math.pow(1 - t, 3) * p0.x +
      3 * Math.pow(1 - t, 2) * t * p1.x +
      3 * (1 - t) * Math.pow(t, 2) * p2.x +
      Math.pow(t, 3) * p3.x,
    y:
      Math.pow(1 - t, 3) * p0.y +
      3 * Math.pow(1 - t, 2) * t * p1.y +
      3 * (1 - t) * Math.pow(t, 2) * p2.y +
      Math.pow(t, 3) * p3.y,
    z:
      Math.pow(1 - t, 3) * p0.z +
      3 * Math.pow(1 - t, 2) * t * p1.z +
      3 * (1 - t) * Math.pow(t, 2) * p2.z +
      Math.pow(t, 3) * p3.z,
  };
};

const getSurfacePoint = (u, v, points) => {
  const point = [];
  for (let i = 0; i < points.length; i++) {
    point.push(
      getCubicBezierPoint(
        u,
        points[i][0],
        points[i][1],
        points[i][2],
        points[i][3]
      )
    );
  }
  return getQuadraticBezierPoint(v, point[0], point[1], point[2]);
};

const multiplyMatrices = (m1, m2) => {
  const result = [];
  for (let i = 0; i < m1.length; i++) {
    result[i] = [];
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

const getMultipliedPoint = (m, p) => {
  const res = multiplyMatrices(m, [[p.x], [p.y], [p.z], [1]]).map(
    arr => arr[0]
  );
  return { x: res[0], y: res[1], z: res[2] };
};

const getLandslide = (p, pref) => {
  const [res] = multiplyMatrices(
    [[p.x, p.y, p.z, 1]],
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [pref.ls.x, pref.ls.y, pref.ls.z, 1],
    ]
  );

  return { x: res[0], y: res[1], z: res[2] };
};

const degToRad = deg => deg * (Math.PI / 180);

const createFigure = () => {
  return {
    material: new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.5,
      roughness: 0,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      emissive: 0x000000,
      color: 0xffffff,
      emissiveIntensity: 0.2,
    }),
    surfaces: [
      [
        [
          { x: 4, y: 11, z: 0 },
          { x: 4.38, y: 5.17, z: 0 },
          { x: 5, y: 2.63, z: 0 },
          { x: 8, y: 1, z: 0 },
        ],
        [
          { x: 4, y: 11, z: 8 },
          { x: 4.38, y: 5.17, z: 8 },
          { x: 5, y: 2.63, z: 8 },
          { x: 7, y: 1, z: 8 },
        ],
        [
          { x: 4, y: 11, z: 16 },
          { x: 4, y: 5, z: 16 },
          { x: 3.2, y: 2, z: 16 },
          { x: 2.54, y: 1, z: 16 },
        ],
      ],
      [
        [
          { x: 8, y: 1, z: 0 },
          { x: 10, y: 0.5, z: 0 },
          { x: 10, y: -2, z: 0 },
          { x: 8, y: -1, z: 0 },
        ],
        [
          { x: 7, y: 1, z: 8 },
          { x: 8.5, y: -0.5, z: 8 },
          { x: 5.5, y: -1, z: 8 },
          { x: 5, y: -1, z: 8 },
        ],
        [
          { x: 2.54, y: 1, z: 16 },
          { x: 2.2, y: 0.5, z: 16 },
          { x: 1.2, y: -1, z: 16 },
          { x: 0, y: -1, z: 16 },
        ],
      ],
      [
        [
          { x: 8, y: -1, z: 0 },
          { x: 4, y: 1, z: 0 },
          { x: -4, y: 1, z: 0 },
          { x: -8, y: -1, z: 0 },
        ],
        [
          { x: 5, y: -1, z: 8 },
          { x: 2, y: 1, z: 8 },
          { x: -2, y: 1, z: 8 },
          { x: -5, y: -1, z: 8 },
        ],
        [
          { x: 0, y: -1, z: 16 },
          { x: 0, y: -1, z: 16 },
          { x: 0, y: -1, z: 16 },
          { x: 0, y: -1, z: 16 },
        ],
      ],
      [
        [
          { x: -8, y: 1, z: 0 },
          { x: -10, y: 0.5, z: 0 },
          { x: -10, y: -2, z: 0 },
          { x: -8, y: -1, z: 0 },
        ],
        [
          { x: -7, y: 1, z: 8 },
          { x: -8.5, y: -0.5, z: 8 },
          { x: -5.5, y: -1, z: 8 },
          { x: -5, y: -1, z: 8 },
        ],
        [
          { x: -2.54, y: 1, z: 16 },
          { x: -2.2, y: 0.5, z: 16 },
          { x: -1.2, y: -1, z: 16 },
          { x: 0, y: -1, z: 16 },
        ],
      ],
      [
        [
          { x: -4, y: 11, z: 0 },
          { x: -4.38, y: 5.17, z: 0 },
          { x: -5, y: 2.63, z: 0 },
          { x: -8, y: 1, z: 0 },
        ],
        [
          { x: -4, y: 11, z: 8 },
          { x: -4.38, y: 5.17, z: 8 },
          { x: -5, y: 2.63, z: 8 },
          { x: -7, y: 1, z: 8 },
        ],
        [
          { x: -4, y: 11, z: 16 },
          { x: -4, y: 5, z: 16 },
          { x: -3.2, y: 2, z: 16 },
          { x: -2.54, y: 1, z: 16 },
        ],
      ],
    ],
  };
};

const renderScene = (figure, camera, scene, renderer, pref) => {
  const rotateX = [
    [1, 0, 0, 0],
    [0, Math.cos(degToRad(pref.r.x)), -Math.sin(degToRad(pref.r.x)), 0],
    [0, Math.sin(degToRad(pref.r.x)), Math.cos(degToRad(pref.r.x)), 0],
    [0, 0, 0, 1],
  ];

  const rotateY = [
    [Math.cos(degToRad(pref.r.y)), 0, Math.sin(degToRad(pref.r.y)), 0],
    [0, 1, 0, 0],
    [-Math.sin(degToRad(pref.r.y)), 0, Math.cos(degToRad(pref.r.y)), 0],
    [0, 0, 0, 1],
  ];

  const rotateZ = [
    [Math.cos(degToRad(pref.r.z)), -Math.sin(degToRad(pref.r.z)), 0, 0],
    [Math.sin(degToRad(pref.r.z)), Math.cos(degToRad(pref.r.z)), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  // Landslide -> Rotate
  figure.surfaces = figure.surfaces.map(surface =>
    surface.map(points =>
      points
        .map(p => getLandslide(p, pref))
        .map(p => getMultipliedPoint(rotateX, p))
        .map(p => getMultipliedPoint(rotateY, p))
        .map(p => getMultipliedPoint(rotateZ, p))
    )
  );

  for (let i = 0; i < figure.surfaces.length; i++) {
    const positions = [];
    const indices = [];
    for (let u = 0; Math.round(u * 10) / 10 <= 1; u += pref.uStep) {
      for (let v = 0; Math.round(v * 10) / 10 <= 1; v += pref.vStep) {
        const point = getSurfacePoint(u, v, figure.surfaces[i]);
        positions.push(point.x, point.y, point.z);
      }
    }
    for (let i = 0; i < positions.length / 3 - pref.vCount - 1; i++) {
      if ((i + 1) % pref.vCount !== 0) {
        indices.push(i, i + pref.vCount, i + pref.vCount + 1);
        indices.push(i, i + pref.vCount + 1, i + 1);
      }
    }

    // Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    // Mesh
    const mesh = new THREE.Mesh(geometry, figure.material);
    scene.add(mesh);
  }

  // Light
  const light = new THREE.SpotLight(0xffffff, 100, 100, Math.PI / 2, 0);
  light.position.set(pref.l.x, pref.l.y, pref.l.z);
  scene.add(light);

  // Light helper
  const lightMaterial = new THREE.PointLightHelper(light, 1);
  scene.add(lightMaterial);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  renderer.render(scene, camera);
};

export const renderEvent = (renderer, pref) => {
  const scene = setupScene();
  const camera = setupCamera(pref);
  const figure = createFigure();

  renderScene(figure, camera, scene, renderer, pref);
};
