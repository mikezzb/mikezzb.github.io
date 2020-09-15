import React, { useRef, useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useSprings, a } from '@react-spring/three';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { Zoom, Fade } from 'react-reveal';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import './App.css';

const number = isMobile ? 25 : 35;

const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue'];

const random = i => {
    const r = Math.random();
    return {
        position: [(isMobile ? 80 : 175) - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
        color: colors[Math.round(Math.random() * (colors.length - 1))],
        scale: [1 + r * 14, 1 + r * 14, 1],
        rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)],
    };
};

const data = new Array(number).fill().map(() => ({
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10],
}));

const Content = () => {
    const [springs, set] = useSprings(number, i => ({
        from: random(i),
        ...random(i),
        config: { mass: 20, tension: 150, friction: 50 },
    }));
    useEffect(() =>
        setInterval(() => set(i => ({ ...random(i), delay: i * 40 })), 2600),
    []);
    return data.map((d, index) => (
        <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
            <boxBufferGeometry
                attach="geometry"
                args={d.args}
            />
            <a.meshStandardMaterial
                attach="material"
                color={springs[index].color}
                roughness={0.75}
                metalness={0.5}
            />
        </a.mesh>
    ));
};

const Lights = () => (
    <group>
        <pointLight intensity={0.3} />
        <ambientLight intensity={2} />
        <spotLight
            castShadow
            intensity={0.2}
            angle={Math.PI / 7}
            position={[150, 150, 250]}
            penumbra={1}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
    </group>
);

export default function App() {
    return (
        <>
            <div className="intro page">
                <div className="text-overlay">
                    <div className="name-bar">
                        <div>
                            <h4>MIKE</h4>
                            <h4>ZHOU</h4>
                        </div>
                        <span className="divider" />
                        <AiFillGithub onClick={() => window.open('https://github.com/mikezzb')} />
                        <AiFillLinkedin onClick={() => window.open('https://www.linkedin.com/in/mikezzb')} />
                    </div>
                    <div className="description-bar">
                        <BsArrowRight />
                        <h4>Coder&Thinker</h4>
                        <h4>@BEng AIST CUHK</h4>
                    </div>
                </div>
                <Canvas
                    shadowMap
                    camera={{ position: [0, 0, 100], fov: 100 }}
                    onCreated={({ gl }) => gl.setClearColor('black')}
                >
                    <Lights />
                    <Content />
                </Canvas>
            </div>
            <div className="main page">
                <div className="left center">
                    <h2>About</h2>
                </div>
                <Fade right>
                    <div className="right">
                    </div>
                </Fade>
            </div>
            <div className="work page">
                <div className="left" />
                <div className="right center" />
            </div>
        </>
    );
}
