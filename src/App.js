import React, { useRef, useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useSprings, a } from '@react-spring/three';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { Zoom, Fade } from 'react-reveal';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { MdWork, MdSchool } from 'react-icons/md';
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
    useEffect(() => {
        const interval = setInterval(() => set(i => ({ ...random(i), delay: i * 40 })), 2600);
        return (() => clearInterval(interval));
    }, []);
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

const SocialMedia = () => (
    <>
        <AiFillGithub className="social-media" onClick={() => window.open('https://github.com/mikezzb')} />
        <AiFillLinkedin className="social-media" onClick={() => window.open('https://www.linkedin.com/in/mikezzb')} />
    </>
);

export default function App() {
    const [showIntro, setShowIntro] = useState(true);
    const IntroPage = () => (
        <div className="intro page">
            <div className="text-overlay">
                <div className="name-bar">
                    <div>
                        <h4>MIKE</h4>
                        <h4>ZHOU</h4>
                    </div>
                    <span className="divider" />
                    <SocialMedia />
                </div>
                <div className="description-bar">
                    <BsArrowRight
                        onClick={() => setShowIntro(false)}
                    />
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
    );

    const ExperienceCard = ({ experience }) => (
        <div className="experience">
            <div>
                <span className="position">{experience.position}</span>
                <span className="company">{`@${experience.company}`}</span>
            </div>
            <span className="time">{experience.time}</span>
            {
                experience.descriptions.map(text =>
                    <span className="description">
                        <p>{text}</p>
                    </span>
                )
            }
        </div>
    );

    const AboutPage = () => (
        <div className="about page">
            <div className="left">
                <div className="center top">
                    <span className="icon" />
                    <h3>Zhou Zebo</h3>
                    <h4>Full Stack Developer</h4>
                </div>
                <div className="bottom">
                    <div>
                        <div>
                            <span>Mail</span>
                            <span>Blog</span>
                            <span>Location</span>
                        </div>
                        <div>
                            <span>mikezhoudev@gmail.com</span>
                            <span>https://zzblog.herokuapp.com</span>
                            <span>Hong Kong</span>
                        </div>
                    </div>
                    <div>
                        <p>
                            Hi I'm Mike, a tech enthusiast! I love every innovative digital product, both hardware and software, and every cute things.
                            During my leisure time, I love play around with trendy frameworks / technologies.
                        </p>
                    </div>
                    <div>
                        <SocialMedia />
                    </div>
                </div>
            </div>
            <Fade top delay={800}>
                <div className="right">
                    <h2>
                        <span className="dot">
                            <MdWork />
                        </span>
                        WORK EXPERIENCE
                    </h2>
                    {
                        [
                            {
                                position: 'Software Engineer Intern',
                                company: 'KaChick AI Limited',
                                time: 'Jun 2020 - Spet 2020',
                                descriptions: [
                                    'Co developed an online video proofing platform using React.js and Firebase.',
                                    'Assist in the maintenance and enhancement of an existing photo proofing platform',
                                    'Conduct feasibility studies in computer vision such as Google Vision and open-source models to analyze visual data.',
                                ],
                            },
                        ].map(exp => <ExperienceCard experience={exp} />)
                    }
                    <h2>
                        <span className="dot">
                            <MdSchool />
                        </span>
                        EDUCATION
                    </h2>
                    {
                        [
                            {
                                position: 'The Chinese University of Hong Kong',
                                company: 'BEng Artificial Intellegience: System & Technology',
                                time: 'Spet 2019 - Present',
                                descriptions: [
                                    'GPA: 3.7 / 4',
                                    'Dean\'s List, 2019-2020',
                                ],
                            },
                        ].map(exp => <ExperienceCard experience={exp} />)
                    }
                </div>
            </Fade>
        </div>
    );

    return (
        <>
            {
                showIntro ?
                    <IntroPage /> :
                    <Fade bottom>
                        <AboutPage />
                    </Fade>
            }
        </>
    );
}
