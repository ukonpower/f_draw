#include <common>
#include <vert_h>

uniform sampler2D uAudioWaveTex;
uniform sampler2D uAudioFreqTex;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;

uniform float uGrid;
uniform float uGridInv;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec4 instanceId;
layout (location=5) in vec3 instanceNormal;

vec2 getGPUUV( vec3 index ) {

	return vec2( uGridInv * uGridInv * index.x + uGridInv * index.z, index.y );
	
}

void main( void ) {

	#include <vert_in>

	// wave

	float audio = texture( uAudioFreqTex, vec2( instanceId.x, instanceId.y ) ).x;
	audio = pow( audio, 1.0 ) * 2.0;

	outPos += instanceNormal * uGridInv / 2.0;
	outPos *= 1.0 + abs( instanceNormal ) * audio * 0.0;
	outPos -= instanceNormal * uGridInv / 2.0;

	// instance position

	// outPos += instancePos * 0.9;
	vec2 gpuUv = getGPUUV( instanceId.xyz );
	vec4 gpuPosition = texture( gpuSampler0, gpuUv ) - 0.5;
	outPos += gpuPosition.xyz;

	// outPos *= 0.2;
	
	#include <vert_out>

}