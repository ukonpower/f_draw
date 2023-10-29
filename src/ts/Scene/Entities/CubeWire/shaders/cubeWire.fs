#include <common>
#include <frag_h>

uniform float uTime;

void main( void ) {

	#include <frag_in>

	if( sin( vUv.y * 80.0 + uTime * 5.0 ) > 0.0) discard;
	
	outEmission += 0.3;
	outColor *= 0.0;
	
	#include <frag_out>

}