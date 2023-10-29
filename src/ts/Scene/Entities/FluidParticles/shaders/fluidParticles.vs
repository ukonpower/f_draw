#include <common>
#include <vert_h>

layout (location = 3) in vec2 computeUV;
layout (location = 4) in vec3 rnd;

uniform vec4 uMidi;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;
uniform float uVisibility;

uniform sampler2D uAudioWaveTex;
uniform sampler2D uAudioFreqTex;

void main( void ) {

	#include <vert_in>

	vec4 gpuPos = texture(gpuSampler0, computeUV );
	vec4 gpuVel = texture(gpuSampler1, computeUV );

	float audioMode = uMidi.x;

	float audio = texture( uAudioFreqTex, vec2( computeUV.x, 0.0 ) ).x;
	audio = pow( audio, 1.0 );

	outPos *= rnd.x * rnd.x * 2.0 + audio * audioMode * 2.5;
	outPos *= uMidi.z * uVisibility;
	outPos *= smoothstep( 1.0, 0.1, gpuPos.w);
	outPos *= smoothstep( 0.1, 0.15, gpuPos.w);
	outPos += gpuPos.xyz;
	
	#include <vert_out>
	
	vec4 vel = ( projectionMatrix * viewMatrix * modelMatrix * vec4( gpuVel.xyz, 0.0 ) );
	vVelocity += vel.xy * 0.2;
	
}