import { OrbitControls, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import * as THREE from 'three';

export default function Experience() {
	const { perfVisible } = useControls({ perfVisible: false });
	const cube = useRef();

	const directionalLight = useRef();
	useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

	const { cubePosition, cubeColour, scale, bgColour } = useControls(
		'Cube Controls',
		{
			cubePosition: {
				value: { x: 0, y: 0 }, //can add z: 0 but then you lose the joystick
				min: -4,
				max: 4,
				step: 0.01,
				joystick: 'invertY',
			},
			cubeColour: { value: 'indigo' },
			bgColour: { value: 'silver' },
			scale: {
				value: 1,
				step: 0.01,
				min: 0,
				max: 5,
			},
		}
	);

	return (
		<>
			{perfVisible ? <Perf position='top-left' /> : null}
			<OrbitControls makeDefault />
			<ambientLight />
			<directionalLight
				ref={directionalLight}
				position={[1, 2, 3]}
				intensity={2}
			/>

			<color args={[bgColour]} attach='background' />

			<mesh
				ref={cube}
				position={[cubePosition.x, cubePosition.y, 0]}
				scale={scale}
			>
				<boxGeometry />
				<meshStandardMaterial color={cubeColour} />
			</mesh>
		</>
	);
}
