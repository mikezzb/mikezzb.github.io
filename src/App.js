import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useSprings, a } from '@react-spring/three';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import {
    AiFillLinkedin, AiFillGithub, AiFillCode, AiFillRead
} from 'react-icons/ai';
import { BsArrowRight, BsCodeSlash } from 'react-icons/bs';
import { MdWork, MdSchool, MdFavorite } from 'react-icons/md';
import { GiLightSabers, GiPistolGun } from 'react-icons/gi';
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

const SKILLS = [
    {
        category: 'Frontend',
        language: [
            {
                name: 'HTML & CSS',
                value: 0.8,
            },
            {
                name: 'React.js',
                value: 0.8,
            },
            {
                name: 'RESTful APIs',
                value: 0.7,
            },
        ],
    },
    {
        category: 'Backend',
        language: [
            {
                name: 'Node.js',
                value: 0.7,
            },
            {
                name: 'MongoDB',
                value: 0.5,
            },
            {
                name: 'MySQL',
                value: 0.48,
            },
        ],
    },
    {
        category: 'AIML',
        language: [
            {
                name: 'Python',
                value: 0.7,
            },
            {
                name: 'Tensorflow',
                value: 0.5,
            },
            {
                name: 'OpenCV',
                value: 0.5,
            },
        ],
    },
    {
        category: 'OTHERS',
        language: [
            {
                name: 'React Native',
                value: 0.6,
            },
            {
                name: 'Android',
                value: 0.5,
            },
            {
                name: 'Java',
                value: 0.5,
            },
        ],
    },
];

export default function App() {
    const [showIntro, setShowIntro] = useState(true);
    const IntroPage = () => {
        const [showTransition, setShowTransition] = useState(false);
        useEffect(() => {
            if (showTransition) {
                setTimeout(() => setShowIntro(false), 2000);
            }
        }, [showTransition]);
        return (
            <div className="intro page">
                {
                    showTransition &&
                    <div className="transition-circle out" />
                }
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
                            onClick={() => setShowTransition(true)}
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
    };

    const ExperienceCard = ({ experience }) => (
        <div className="experience">
            <div>
                <span className="position">{experience.position}</span>
                <span className="company">{`@${experience.company}`}</span>
            </div>
            <span className="time">{experience.time}</span>
            {
                experience.descriptions.map(text =>
                    <span className="description" key={text}>
                        <p>{text}</p>
                    </span>
                )
            }
        </div>
    );

    const SkillCard = () => {
        const [skillIndex, setSkillIndex] = useState(0);
        return (
            <>
                <h2>
                    <span className="dot">
                        <BsCodeSlash />
                    </span>
                    CODING SKILLS
                    <span
                        className="skill-category"
                        onClick={() => setSkillIndex(skillIndex === SKILLS.length - 1 ? 0 : skillIndex + 1)}
                    >
                        {`(${SKILLS[skillIndex].category})`}
                    </span>
                </h2>
                <div className="skills-wrapper">
                    {
                        SKILLS[skillIndex].language.map(skill =>
                            <div className="skill-container" key={skill.name}>
                                <ProgressRing value={skill.value} />
                                <span>
                                    {skill.name}
                                </span>
                            </div>)
                    }
                </div>
            </>
        );
    };

    const ProgressRing = ({ value }) => {
        const [dashArray, setDashArray] = useState(0);
        useEffect(() => {
            if (!dashArray) {
                setDashArray(value * 2 * 60 * Math.PI);
            }
        }, [dashArray]);
        return (
            <svg
                className="progress-circle"
                style={{ strokeDasharray: `${dashArray} 999` }}
                viewbox="0 0 100 100"
            >
                <circle cx="50%" cy="50%" r="60" />
            </svg>
        );
    };

    const AboutPage = () => {
        const [showTransition, setShowTransition] = useState(true);
        useEffect(() => {
            if (showTransition) {
                setTimeout(() => setShowTransition(false), 2500);
            }
        }, [showTransition]);
        return (
            <div className="about page">
                {
                    showTransition &&
                    <div className="transition-circle" />
                }
                <div className="left">
                    <div className="center top">
                        <span className="icon" onClick={() => setShowIntro(true)} />
                        <h3>Zebo, Zhou</h3>
                        <h4>About to be a Full Stack Developer</h4>
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
                                Hi I'm Mike, a tech enthusiast! I love every innovative digital product, both hardware and software.
                                During my leisure time, I love play around with trendy frameworks & gadgets.
                            </p>
                        </div>
                        <div>
                            <SocialMedia />
                        </div>
                    </div>
                </div>
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
                                    'Co-developed an online video proofing platform using React.js and Firebase.',
                                    'Implemented a fully functional player control without external libraries',
                                    'Assist in the maintenance and enhancement of an existing photo proofing platform',
                                    'Conduct feasibility studies in computer vision such as Google Vision and open-source models to analyze visual data.',
                                ],
                            },
                        ].map(exp => <ExperienceCard experience={exp} key={exp.time} />)
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
                                    'Dean\'s List, 2019-2020',
                                ],
                            },
                        ].map(exp => <ExperienceCard experience={exp} key={exp.time} />)
                    }
                    <SkillCard />
                    <h2>
                        <span className="dot">
                            <MdFavorite />
                        </span>
                        INTERESTS
                    </h2>
                    <div className="interests-wrapper">
                        <div>
                            <AiFillRead />
                            Reading
                        </div>
                        <div>
                            <AiFillCode />
                            Coding
                        </div>
                        <div onClick={() => window.open('https://scoresaber.com/u/76561198398187162')}>
                            <GiLightSabers />
                            Beat Saber
                        </div>
                        <div>
                            <GiPistolGun />
                            FPS Games
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {
                showIntro ?
                    <IntroPage /> :
                    <AboutPage key="About" />
            }
        </>
    );
}
