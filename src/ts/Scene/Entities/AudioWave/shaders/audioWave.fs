#include <common>
#include <frag_h>

uniform vec4 uMidi;

void main( void ) {

	#include <frag_in>

	outEmission += smoothstep( 0.0, 0.5, abs( vUv.y - 0.5 ) );
	outEmission *= uMidi.z;
	outEnv = 0.0;
	
	#include <frag_out>

}