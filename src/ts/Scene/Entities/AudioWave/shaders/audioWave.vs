#include <common>
#include <vert_h>

uniform sampler2D uAudioWaveTex;
uniform vec4 uMidi;

void main( void ) {

	#include <vert_in>

	vec2 v = uv;
	v.x = abs( v.x - 0.5 ) * 2. * (uMidi.y * uMidi.y);
	v.x = 1.0 - v.x;

	float w = texture( uAudioWaveTex, v ).x - 0.5;
	w *= uMidi.w * 2.0;
	outPos.y *= abs( w ) * 20.0;
	outPos.y += (w) * 5.0;
	
	#include <vert_out>

}