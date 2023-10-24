#include <common>
#include <noise>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;
uniform vec2 uGPUResolution;

uniform float uGrid;
uniform float uGridInv;

uniform float uTime;

in vec2 vUv;

#include <noise4D>
#include <rotate>

// vec2 get3DUv( vec2 uv ) {

// 	return vec3(

// 	);
	
// }

void main( void ) {

	float t = uTime * 0.8;
	float id = ( vUv.x * uGPUResolution.x + vUv.y ) / uGPUResolution.x;

	vec4 position = texture( gpuSampler0, vUv );
	vec4 velocity = texture( gpuSampler1, vUv );

	// velocity

	vec3 noisePosition = position.xyz * 0.6 + id * (0.5);
	vec3 noise = fbm3( noisePosition + uTime ) - 0.45;

	noise = noise * (0.004);
	velocity.xyz *= 0.99;
	velocity.xyz += noise;

	vec3 gravity = vec3( 0.00001 );

	vec3 gPos = position.xyz + vec3( 0.0, 0.0, 0.0 );
	gravity += gPos.xyz * smoothstep( 1.0, 3.0, length( gPos.xyz ) ) * -vec3(0.001) ;

	velocity.xyz += gravity;

	if( length( velocity.xyz ) > 0.15 ) {

		velocity.xyz = normalize( velocity.xyz ) * 0.15;

	}

	//  position

	// position.xyz += velocity.xyz;
	position.x = fract(vUv.x * uGrid);
	position.y = vUv.y;
	position.z = floor(vUv.x * uGrid) / uGrid;

	position.xyz -= 0.5;
	// position.xyz *= 10.0;
	// position.xyz += 0.5;

	// lifetime

	// position.w += 0.016 / 10.0;
	position.w = 1.0;

	// out

	outColor0 = position;
	outColor1 = velocity;

} 