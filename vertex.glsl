#version 300 es
#define attribute in
#define varying out
precision highp float;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

in vec3 position; // Declare position as an input
in vec2 uv;

out vec3 csm_Position; // Declare output for position
out vec2 vUv; // Varying for UVs

float circle(vec2 uv, vec2 circlePosition, float radius) {
    float dist = distance(circlePosition, uv);
    return 1. - smoothstep(0.0, radius, dist);
}

float elevation(float radius, float intensity) {
    float circleShape = circle(vUv, (uMouse * 0.5) + 0.5, radius);
    return circleShape * intensity;
}

void main() {
    vec3 newPosition = position;
    newPosition.z += elevation(0.2, .7);
    
    csm_Position = newPosition; // Set the output position
    vUv = uv; // Pass UVs to the fragment shader
    gl_Position = projectionMatrix * modelViewMatrix * modelMatrix * vec4(newPosition, 1.0); // Set final vertex position
}
