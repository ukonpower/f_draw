#include <common>
#include <vert_h>

uniform sampler2D uAudioWaveTex;
uniform sampler2D uAudioFreqTex;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;

uniform float uGrid;
uniform float uGridInv;

uniform vec4 uMidi;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec4 instanceId;
layout (location=5) in vec3 instanceNormal;
layout (location=6) in vec4 instanceRandom;

vec2 getGPUUV( vec3 index ) {

	return vec2( uGridInv * index.x + index.z, index.y );
	
}

void main( void ) {

	#include <vert_in>

	vec2 gpuUv = getGPUUV( instanceId.xyz );
	vec4 gpuPosition = texture( gpuSampler0, gpuUv );

	// wave

	float audio = texture( uAudioFreqTex, vec2( instanceRandom.x, 0.0 ) ).x;
	audio = pow( audio, 1.0 ) * 2.0;

	outPos.xyz *= 1.0 + audio * uMidi.x * 2.0;
	outPos += instanceNormal * uGridInv / 2.0;
	outPos *= 1.0 + abs( instanceNormal ) * audio * 10.0 * smoothstep( 1.25, 0.9, length( gpuPosition ) ) * uMidi.x;
	outPos -= instanceNormal * uGridInv / 2.0;

	// instance position

	outPos += gpuPosition.xyz * 1.0;
	outPos += instanceNormal * ( audio * ( uMidi.x * 2.0 ) );

	outPos *= 0.5;

	// outPos *= 0.2;
	
	#include <vert_out>

}