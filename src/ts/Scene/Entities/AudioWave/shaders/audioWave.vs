#include <common>
#include <vert_h>

uniform sampler2D uAudioWaveTex;

void main( void ) {

	#include <vert_in>

	vec2 v = uv;
	v.x = 1.0 - v.x;

	float w = texture( uAudioWaveTex, v * vec2( 0.2, 0.0) ).x - 0.5;
	outPos.x *= 12.0;
	outPos.y *= 0.01 + abs( w ) * 5.0;
	outPos.y += (w) * 5.0;
	
	#include <vert_out>

}