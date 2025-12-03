#version 300 es
#define varying in
out vec4 csm_DiffuseColor; // Declare output color
precision highp float;

in vec2 vUv; // Receive UVs from vertex shader
uniform sampler2D uTexture;

void main() {
    vec4 finalTexture = texture(uTexture, vUv); // Use the correct texture function
    csm_DiffuseColor = finalTexture; // Set the fragment color
}
