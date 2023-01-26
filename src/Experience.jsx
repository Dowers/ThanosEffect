import { OrbitControls, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default function Experience() {
	const { perfVisible } = useControls({ perfVisible: true });

	const directionalLight = useRef();
	useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

	const { colour, bgColour, wireframe } = useControls('Cube Controls', {
		bgColour: { value: 'silver' },
		wireframe: false,
	});

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
			<mesh>
				<icosahedronGeometry args={[1, 3]} />
				<shaderMaterial
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					wireframe={wireframe}
				/>
			</mesh>
		</>
	);
}
