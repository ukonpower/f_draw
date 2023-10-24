#include <common>
#include <vert_h>

uniform sampler2D uAudioWaveTex;
uniform sampler2D uAudioFreqTex;
uniform float uGrid;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec4 id;
layout (location=5) in vec3 instanceNormal;

void main( void ) {

	#include <vert_in>

	float audio = texture( uAudioFreqTex, vec2( id.x, id.y ) ).x;
	audio = pow( audio, 1.0 ) * 2.0;
	// audio = smoothstep(  0.3, 0.8, audio);

	float gridInv = 1.0 / uGrid;

	outPos += instanceNormal * gridInv / 2.0;
	outPos *= 1.0 + abs( instanceNormal ) * audio * 25.0;
	outPos -= instanceNormal * gridInv / 2.0;

	outPos += instancePos * 0.9;
	
	#include <vert_out>

}