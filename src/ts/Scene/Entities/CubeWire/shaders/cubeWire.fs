#include <common>
#include <frag_h>

uniform float uTime;

void main( void ) {

	#include <frag_in>

	if( sin( vUv.y * 250.0 + uTime * 5.0 ) > 0.0) discard;
	
	outEmission += 0.3 * smoothstep( 1.0, 0.0, abs( vUv.y - 0.5 ) );
	outColor *= 0.0;
	
	#include <frag_out>

}