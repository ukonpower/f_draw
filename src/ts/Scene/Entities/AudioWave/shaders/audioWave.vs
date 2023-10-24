#include <common>
#include <vert_h>

uniform sampler2D uAudioWaveTex;

void main( void ) {

	#include <vert_in>

	float w = texture( uAudioWaveTex, uv * vec2( 0.1, 0.0) ).x - 0.5;
	outPos.x *= 12.0;
	outPos.y *= 0.01 + abs( w ) * 10.0;
	outPos.y += (w) * 5.0;
	
	#include <vert_out>

}