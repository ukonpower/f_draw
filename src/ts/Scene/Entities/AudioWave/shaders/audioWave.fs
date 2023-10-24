#include <common>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outEmission += 1.0 * vUv.y;
	
	#include <frag_out>

}