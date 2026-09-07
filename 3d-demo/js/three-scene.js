// All WebGL scenes for the site, built on the global THREE namespace (r128, no modules).
// Every scene degrades gracefully: if WebGL is unavailable or the visitor prefers reduced
// motion, we still render one static frame instead of animating.
(function () {
  if (typeof THREE === 'undefined') return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function makeRenderer(canvas) {
    try {
      return new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return null;
    }
  }

  // Keeps a canvas's drawing buffer matched to its parent's box at all times —
  // ResizeObserver catches layout shifts (grid reflow, font load, orientation
  // change) that a plain window "resize" listener would miss.
  function watchSize(canvas, onResize) {
    const parent = canvas.parentElement;
    const run = () => {
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);
      onResize(w, h);
    };
    run();
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(run).observe(parent);
    } else {
      window.addEventListener('resize', run);
    }
  }

  function applySize(renderer, camera, w, h) {
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // Pushes the camera back just far enough that a sphere of the given radius is
  // always fully inside the frustum, on any aspect ratio — this is what stops the
  // model from ever clipping against the edges of its container.
  function fitCameraDistance(camera, radius, margin) {
    const vFov = (camera.fov * Math.PI) / 180;
    const distForHeight = radius / Math.tan(vFov / 2);
    const distForWidth = radius / (Math.tan(vFov / 2) * camera.aspect);
    return Math.max(distForHeight, distForWidth) * margin;
  }

  // Same idea for a rectangular spread of content (a starfield or a scattered
  // shape field) instead of a single sphere — without this, content authored to
  // look right on a wide desktop container gets pushed outside the frustum on a
  // narrow/tall mobile one and simply never renders.
  function fitCameraToBox(camera, halfWidth, halfHeight, margin) {
    const vFov = (camera.fov * Math.PI) / 180;
    const distForHeight = halfHeight / Math.tan(vFov / 2);
    const distForWidth = halfWidth / (Math.tan(vFov / 2) * camera.aspect);
    return Math.max(distForHeight, distForWidth) * margin;
  }

  /* ---------------- Ambient background starfield (full hero bleed) ---------------- */
  function initHeroParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    const renderer = makeRenderer(canvas);
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);

    const starHalfW = 17, starHalfH = 12;
    const starCount = 500;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * starHalfW * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * starHalfH * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.028, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    watchSize(canvas, (w, h) => {
      applySize(renderer, camera, w, h);
      camera.position.z = fitCameraToBox(camera, starHalfW, starHalfH, 1.05);
    });

    function render() {
      stars.rotation.y += 0.0006;
      stars.rotation.x += 0.0002;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(render);
    }
    render();
  }

  /* ---------------- Hero core scene: bounded model frame, never clips ---------------- */
  function initHeroCore() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const renderer = makeRenderer(canvas);
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);

    const core = new THREE.Group();

    const solidGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const solidMat = new THREE.MeshStandardMaterial({ color: 0x14142a, metalness: 0.7, roughness: 0.2, emissive: 0x1c1240, emissiveIntensity: 0.55 });
    const solid = new THREE.Mesh(solidGeo, solidMat);
    core.add(solid);

    const wireGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.55 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    core.add(wire);

    const innerGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.45 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    core.add(inner);
    scene.add(core);

    // Orbiting particles for extra depth
    const orbitCount = 26;
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPositions = new Float32Array(orbitCount * 3);
    const orbitData = [];
    for (let i = 0; i < orbitCount; i++) {
      const radius = 2.1 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 1.2;
      orbitData.push({ radius, angle, tilt, speed: 0.002 + Math.random() * 0.004 });
    }
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
    const orbitMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.05, transparent: true, opacity: 0.8 });
    const orbitPoints = new THREE.Points(orbitGeo, orbitMat);
    scene.add(orbitPoints);

    const key = new THREE.PointLight(0x00e5ff, 2.4, 20);
    key.position.set(3, 2, 4);
    scene.add(key);
    const fill = new THREE.PointLight(0x7c5cff, 1.8, 20);
    fill.position.set(-3, -2, 3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x222233, 1.1));

    let camZ = 6;
    watchSize(canvas, (w, h) => {
      applySize(renderer, camera, w, h);
      camZ = fitCameraDistance(camera, 2.7, 1.2);
      camera.position.z = camZ;
    });

    let targetX = 0, targetY = 0;
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    function render() {
      core.rotation.y += 0.0032;
      core.rotation.x += 0.0012;
      wire.rotation.y -= 0.0018;
      inner.rotation.y += 0.005;
      inner.rotation.x -= 0.003;

      const posAttr = orbitGeo.attributes.position;
      orbitData.forEach((p, i) => {
        p.angle += p.speed;
        posAttr.setXYZ(i, Math.cos(p.angle) * p.radius, p.tilt + Math.sin(p.angle * 0.6) * 0.3, Math.sin(p.angle) * p.radius);
      });
      posAttr.needsUpdate = true;

      camera.position.x += (targetX * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 1.6 - camera.position.y) * 0.04;
      camera.position.z += (camZ - camera.position.z) * 0.1;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(render);
    }
    render();
  }

  /* ---------------- Intro mini scene: slow auto-rotating torus knot ---------------- */
  function initIntro() {
    const canvas = document.getElementById('introCanvas');
    if (!canvas) return;
    const renderer = makeRenderer(canvas);
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    const geo = new THREE.TorusKnotGeometry(1.15, 0.36, 140, 20);
    const mat = new THREE.MeshStandardMaterial({ color: 0x7c5cff, metalness: 0.4, roughness: 0.25, emissive: 0x120a33, emissiveIntensity: 0.6 });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    const key = new THREE.PointLight(0x00e5ff, 2.2, 20);
    key.position.set(4, 3, 5);
    scene.add(key);
    const fill = new THREE.PointLight(0x7c5cff, 1.6, 20);
    fill.position.set(-4, -2, 3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x222233, 1.2));

    watchSize(canvas, (w, h) => {
      applySize(renderer, camera, w, h);
      camera.position.z = fitCameraDistance(camera, 1.55, 1.5);
    });

    function render() {
      knot.rotation.y += 0.006;
      knot.rotation.x += 0.003;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(render);
    }
    render();
  }

  /* ---------------- Showcase scene: drag-to-rotate interactive object ---------------- */
  function initShowcase() {
    const canvas = document.getElementById('showcaseCanvas');
    const viewer = document.querySelector('.showcase-viewer');
    if (!canvas || !viewer) return;
    const renderer = makeRenderer(canvas);
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    const group = new THREE.Group();
    const geo = new THREE.DodecahedronGeometry(1.7, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x0d0d1a, metalness: 0.75, roughness: 0.18, emissive: 0x1c1240, emissiveIntensity: 0.5 });
    const solid = new THREE.Mesh(geo, mat);
    group.add(solid);

    const wireGeo = new THREE.DodecahedronGeometry(1.74, 0);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.5 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);
    scene.add(group);

    const key = new THREE.PointLight(0x7c5cff, 2.4, 20);
    key.position.set(4, 3, 5);
    scene.add(key);
    const fill = new THREE.PointLight(0x00e5ff, 1.8, 20);
    fill.position.set(-4, -3, 4);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x222233, 1));

    watchSize(canvas, (w, h) => {
      applySize(renderer, camera, w, h);
      camera.position.z = fitCameraDistance(camera, 1.74, 1.7);
    });

    let dragging = false;
    let lastX = 0, lastY = 0;
    let velX = 0, velY = 0;
    let autoSpin = true;

    function pointerDown(x, y) { dragging = true; autoSpin = false; lastX = x; lastY = y; velX = 0; velY = 0; }
    function pointerMove(x, y) {
      if (!dragging) return;
      const dx = x - lastX;
      const dy = y - lastY;
      group.rotation.y += dx * 0.008;
      group.rotation.x += dy * 0.008;
      velX = dx * 0.008;
      velY = dy * 0.008;
      lastX = x; lastY = y;
    }
    function pointerUp() { dragging = false; }

    viewer.addEventListener('mousedown', (e) => pointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => pointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', pointerUp);
    viewer.addEventListener('touchstart', (e) => pointerDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    viewer.addEventListener('touchmove', (e) => pointerMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    viewer.addEventListener('touchend', pointerUp);

    function render() {
      if (!dragging) {
        if (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001) {
          group.rotation.y += velX;
          group.rotation.x += velY;
          velX *= 0.94;
          velY *= 0.94;
        } else if (autoSpin) {
          group.rotation.y += 0.0045;
        }
      }
      wire.rotation.copy(group.rotation);
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(render);
    }
    render();
  }

  /* ---------------- Section background scene: a drifting field of small wireframe
     shapes, reused for the Services and Process sections so their flat text/card
     content sits in front of real, live 3D motion rather than a static panel ---------------- */
  function initFieldScene(canvasId, shapeType, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const renderer = makeRenderer(canvas);
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);

    const fieldHalfW = 8, fieldHalfH = 4.5;
    const group = new THREE.Group();
    const count = 16;
    const shapes = [];
    for (let i = 0; i < count; i++) {
      const size = 0.35 + Math.random() * 0.55;
      const geo = shapeType === 'octa' ? new THREE.OctahedronGeometry(size, 0) : new THREE.BoxGeometry(size, size, size);
      const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.28 + Math.random() * 0.2 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * fieldHalfW * 2, (Math.random() - 0.5) * fieldHalfH * 2, (Math.random() - 0.5) * 8);
      mesh.userData.spin = { x: (Math.random() - 0.5) * 0.006, y: (Math.random() - 0.5) * 0.006 };
      mesh.userData.drift = { y: 0.15 + Math.random() * 0.2, phase: Math.random() * Math.PI * 2 };
      group.add(mesh);
      shapes.push(mesh);
    }
    scene.add(group);

    watchSize(canvas, (w, h) => {
      applySize(renderer, camera, w, h);
      camera.position.z = fitCameraToBox(camera, fieldHalfW, fieldHalfH, 1.15);
    });

    let t = 0;
    function render() {
      t += 0.01;
      shapes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.spin.x;
        mesh.rotation.y += mesh.userData.spin.y;
        mesh.position.y += Math.sin(t + mesh.userData.drift.phase) * 0.0015 * mesh.userData.drift.y;
      });
      group.rotation.y += 0.0003;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(render);
    }
    render();
  }

  /* ---------------- CTA scene: drifting particle field ---------------- */
  function initCta() {
    const canvas = document.getElementById('ctaCanvas');
    if (!canvas) return;
    const renderer = makeRenderer(canvas);
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);

    const ctaHalfW = 11, ctaHalfH = 6;
    const count = 320;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * ctaHalfW * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * ctaHalfH * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.045, transparent: true, opacity: 0.6 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    watchSize(canvas, (w, h) => {
      applySize(renderer, camera, w, h);
      camera.position.z = fitCameraToBox(camera, ctaHalfW, ctaHalfH, 1.05);
    });

    function render() {
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0003;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(render);
    }
    render();
  }

  initHeroParticles();
  initHeroCore();
  initIntro();
  initFieldScene('servicesCanvas', 'box', 0x7c5cff);
  initShowcase();
  initFieldScene('processCanvas', 'octa', 0x00e5ff);
  initCta();
})();
