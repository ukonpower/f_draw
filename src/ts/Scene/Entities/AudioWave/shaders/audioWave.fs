#include <common>
#include <frag_h>

uniform vec4 uMidi;

void main( void ) {

	#include <frag_in>

	outEmission += 1.0 * vUv.y;
	outEmission *= uMidi.z;
	
	#include <frag_out>

}