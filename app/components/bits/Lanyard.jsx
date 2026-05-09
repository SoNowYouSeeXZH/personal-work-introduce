/* eslint-disable react-hooks/immutability */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_GLB = '/card.glb';
const LANYARD_PNG = '/lanyard.png';

const CN_FONT = '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

function makeFrontTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 720;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#fff8e7';
  ctx.fillRect(0, 0, 512, 720);

  ctx.strokeStyle = '#e8655a';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, 476, 684);

  ctx.fillStyle = '#c0392b';
  ctx.font = `bold 44px ${CN_FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('宠物身份证', 256, 100);

  ctx.fillStyle = '#7a7a7a';
  ctx.font = `22px ${CN_FONT}`;
  ctx.fillText('Fuzai ID Card', 256, 138);

  ctx.strokeStyle = '#f0c4b5';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 170);
  ctx.lineTo(452, 170);
  ctx.stroke();

  const items = [
    ['姓　名', '福仔'],
    ['年　龄', '2 岁'],
    ['性　别', '男'],
    ['民　族', '蓝猫'],
    ['学　历', '文盲'],
  ];
  items.forEach(([k, v], i) => {
    const y = 240 + i * 78;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8a8a8a';
    ctx.font = `26px ${CN_FONT}`;
    ctx.fillText(k, 72, y);
    ctx.fillStyle = '#c0392b';
    ctx.fillText('：', 168, y);
    ctx.fillStyle = '#2c3e50';
    ctx.font = `bold 34px ${CN_FONT}`;
    ctx.fillText(v, 206, y);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#e8655a';
  ctx.font = `bold 24px ${CN_FONT}`;
  ctx.fillText('🐾 福仔官方认证 🐾', 256, 660);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeBackTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 720;
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 720);
  grad.addColorStop(0, '#1f2937');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 720);

  ctx.strokeStyle = '#f8d5c4';
  ctx.lineWidth = 4;
  ctx.strokeRect(22, 22, 468, 676);

  ctx.fillStyle = '#fbe7c6';
  ctx.font = `bold 82px ${CN_FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('小徐家', 256, 300);
  ctx.fillText('螺丝厂', 256, 400);

  ctx.fillStyle = '#d1a987';
  ctx.font = `22px "Courier New", monospace`;
  ctx.fillText("Xu's Screw Factory", 256, 450);

  ctx.strokeStyle = '#d1a987';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 490);
  ctx.lineTo(392, 490);
  ctx.stroke();

  ctx.fillStyle = '#f8d5c4';
  ctx.font = `24px ${CN_FONT}`;
  ctx.fillText('员工编号：001', 256, 550);
  ctx.fillText('工　　龄：730 天', 256, 592);
  ctx.fillText('岗　　位：首席搞笑官', 256, 634);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };
  const { nodes, materials } = useGLTF(CARD_GLB);
  const bandTexture = useTexture(LANYARD_PNG);

  const frontTexture = useMemo(() => makeFrontTexture(), []);
  const backTexture = useMemo(() => makeBackTexture(), []);

  const cardDims = useMemo(() => {
    const geom = nodes?.card?.geometry;
    if (!geom) return { width: 0.7, height: 1, depth: 0.01, cx: 0, cy: 0, cz: 0 };
    geom.computeBoundingBox();
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    geom.boundingBox.getSize(size);
    geom.boundingBox.getCenter(center);
    return { width: size.x, height: size.y, depth: size.z, cx: center.x, cy: center.y, cz: center.z };
  }, [nodes]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

  const planeW = cardDims.width * 0.92;
  const planeH = cardDims.height * 0.92;
  const frontZ = cardDims.cz + cardDims.depth / 2 + 0.003;
  const backZ = cardDims.cz - cardDims.depth / 2 - 0.003;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh position={[cardDims.cx, cardDims.cy, frontZ]}>
              <planeGeometry args={[planeW, planeH]} />
              <meshBasicMaterial map={frontTexture} toneMapped={false} />
            </mesh>
            <mesh
              position={[cardDims.cx, cardDims.cy, backZ]}
              rotation={[0, Math.PI, 0]}
            >
                          <planeGeometry args={[planeW, planeH]} />
              <meshBasicMaterial map={backTexture} toneMapped={false} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB);
