uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;
float PI = 3.1415;

void main()
{
    vUv = uv;

    vec3 pos = position;
    pos.x *= sin((uv.y + uv.x * uTime) * 10.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
}