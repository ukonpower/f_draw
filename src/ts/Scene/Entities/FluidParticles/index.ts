import * as MXP from 'maxpower';

import * as GLP from 'glpower';

import { gl, globalUniforms, midimix, mpkmini } from '~/ts/Globals';

import fluidParticlesVert from './shaders/fluidParticles.vs';
import fluidParticlesFrag from './shaders/fluidParticles.fs';
import fluidParticlesCompute from './shaders/fluidParticlesCompute.glsl';

export class FluidParticles extends MXP.Entity {

	private gpu: MXP.GPUComputePass;
	private commonUniforms: GLP.Uniforms;

	constructor() {

		super();

		const count = new GLP.Vector( 128, 128 );

		this.commonUniforms = GLP.UniformsUtils.merge( {
			uMidi: {
				value: midimix.vectorsLerped[ 1 ],
				type: '4fv'
			},
			uMidi2: {
				value: mpkmini.vectorsLerped[ 1 ],
				type: '4fv'
			},
			uPause: {
				value: 0,
				type: '1f'
			},
			uVisibility: {
				value: 0,
				type: "1f"
			}
		}, globalUniforms.audio );

		/*-------------------------------
			Midi
		-------------------------------*/

		midimix.on( "row1/1", ( value: number ) => {
		} );

		midimix.on( "row2/1", () => {

			this.commonUniforms.uPause.value = 1.0 - this.commonUniforms.uPause.value;

		} );

		/*-------------------------------
			GPU
		-------------------------------*/

		this.gpu = new MXP.GPUComputePass( gl, {
			name: 'gpu/fluidParticle',
			size: count,
			layerCnt: 2,
			frag: MXP.hotGet( 'fluidParticlesCompute', fluidParticlesCompute ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, this.commonUniforms ),
		} );

		this.gpu.initTexture( ( l, x, y ) => {

			return [ 0, 0, 0, Math.random() ];

		} );

		this.addComponent( "gpuCompute", new MXP.GPUCompute( { passes: [
			this.gpu
		] } ) );

		/*-------------------------------
			Geometry
		-------------------------------*/

		const computeUVArray = [];
		const rndArray = [];

		for ( let i = 0; i < count.y; i ++ ) {

			for ( let j = 0; j < count.x; j ++ ) {

				computeUVArray.push( j / count.x, i / count.y );
				rndArray.push( Math.random(), Math.random(), Math.random() );

			}

		}

		const geo = this.addComponent( "geometry", new MXP.SphereGeometry( 0.05 ) );
		geo.setAttribute( "computeUV", new Float32Array( computeUVArray ), 2, { instanceDivisor: 1 } );
		geo.setAttribute( "rnd", new Float32Array( rndArray ), 3, { instanceDivisor: 1 } );

		/*-------------------------------
			Material
		-------------------------------*/

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "fluid",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, this.commonUniforms, this.gpu.outputUniforms, {
			} ),
			vert: MXP.hotGet( 'fluidParticlesVert', fluidParticlesVert ),
			frag: MXP.hotGet( 'fluidParticlesFrag', fluidParticlesFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( [ "./shaders/fluidParticles.vs", "./shaders/fluidParticles.fs" ], ( module ) => {

				if ( module[ 0 ] ) {

					mat.vert = MXP.hotUpdate( 'fluidParticlesVert', module[ 0 ].default );

				}

				if ( module[ 1 ] ) {

					mat.frag = MXP.hotUpdate( 'fluidParticlesFrag', module[ 1 ].default );

				}

				mat.requestUpdate();

			} );

			import.meta.hot.accept( "./shaders/fluidParticlesCompute.glsl", ( module ) => {

				if ( module ) {

					this.gpu.frag = MXP.hotUpdate( "fluidParticlesCompute", module.default );
					this.gpu.requestUpdate();

				}

			} );

		}

	}

	public set trailVisibility( value: number ) {

		this.commonUniforms.uVisibility.value = value;

	}

}
