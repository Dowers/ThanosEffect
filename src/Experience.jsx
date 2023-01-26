import { shaderMaterial, OrbitControls, useHelper } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

console.log(vertexShader);
console.log(fragmentShader);

// const customMaterial = shaderMaterial(
// 	{
// 		uTime: 0,
// 		vUv: [1, 1],
// 		vPosition: [1, 2, 3],
// 		pixels: [1, 2],
// 		uPi: 3.141592653589793238,
// 	},
// 	vertexShader,
// 	fragmentShader
// );

// extend({ customMaterial });

export default function Experience() {
	const { perfVisible } = useControls({ perfVisible: true });

	const directionalLight = useRef();
	useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

	const { colour, bgColour, wireframe } = useControls('Cube Controls', {
		bgColour: { value: 'silver' },
		wireframe: false,
	});

	// const customMaterial = useRef();
	// useFrame((state, delta) => {
	// 	customMaterial.current.uTime += delta * 10;
	// });

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
				{/* <customMaterial ref={customMaterial} /> */}
				<shaderMaterial
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						uTime: { value: 0 },
						vUv: { value: [1, 1] },
						vPosition: { value: [1, 1, 1] },
						pixels: { value: [1, 1] },
					}}
				/>
			</mesh>
		</>
	);
}
