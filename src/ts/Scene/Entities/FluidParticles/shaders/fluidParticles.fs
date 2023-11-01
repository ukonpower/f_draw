#include <common>
#include <packing>
#include <frag_h>

#include <re>

uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uAspectRatio;

in vec3 vRnd;

void main( void ) {

	#include <frag_in>

	outColor = vec4( 1.0 );
	outColor.xyz *= 0.0;

	outRoughness = .2;
	outMetalic = 0.0;
	outEmission += smoothstep( 0.995, 1.0, vRnd.x );

	
	#include <frag_out>

} 