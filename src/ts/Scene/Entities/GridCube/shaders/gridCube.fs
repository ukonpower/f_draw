#include <common>
#include <frag_h>

uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	vec4 n = texture( uNoiseTex, vUv / 5.0 );

	outRoughness = 0.15 + n.x;
	// outMetalic = 0.6;

	// outEmission += n.y;
	
	#include <frag_out>

}