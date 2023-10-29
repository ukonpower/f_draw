#include <common>
#include <frag_h>

uniform vec4 uMidi;

void main( void ) {

	#include <frag_in>

	outEmission += smoothstep( 0.0, 0.5, abs( vUv.y - 0.5 ) );
	outEmission *= uMidi.z;
	
	#include <frag_out>

}