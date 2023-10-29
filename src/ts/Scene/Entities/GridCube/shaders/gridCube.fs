#include <common>
#include <frag_h>

uniform sampler2D uNoiseTex;

in vec4 vGpuPos;
in vec4 vGpuVel;

void main( void ) {

	#include <frag_in>

	vec4 n = texture( uNoiseTex, vUv / 5.0 );

	outRoughness = 0.15 + n.x;
	// outMetalic = 0.6;

	// outEmission += n.y;

	outEmission += smoothstep( 0.0, 0.4, length( vGpuVel ) );
	
	#include <frag_out>

}