import * as MXP from 'maxpower';
import * as GLP from 'glpower';

import { gl, globalUniforms } from '~/ts/Globals';

import trailsVert from './shaders/trails.vs';
import trailsFrag from './shaders/trails.fs';
import trailsCompute from './shaders/trailsCompute.glsl';

export class Trails extends MXP.Entity {

	private gpu: MXP.GPUComputePass;

	constructor() {

		super();

		const count = new GLP.Vector( 64, 256 );

		// gpu

		this.gpu = new MXP.GPUComputePass( gl, {
			name: 'gpu/trails',
			size: count,
			layerCnt: 2,
			frag: trailsCompute,
			uniforms: globalUniforms.time,
		} );

		this.gpu.initTexture( ( l, x, y ) => {

			return [ 0, 0, 0, Math.random() ];

		} );

		this.addComponent( "gpuCompute", new MXP.GPUCompute( { passes: [
			this.gpu
		] } ) );

		// geometry

		const range = new GLP.Vector( 10.0, 5.0, 10.0 );

		const idArray = [];

		for ( let i = 0; i < count.y; i ++ ) {

			idArray.push( i / count.y, Math.random(), Math.random() );

		}

		const geo = this.addComponent( "geometry", new MXP.CubeGeometry( 0.1, 0.1, 0.1, 1.0, count.x ) );
		geo.setAttribute( "id", new Float32Array( idArray ), 3, { instanceDivisor: 1 } );

		// material

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "fluid",
			type: [ "deferred", 'shadowMap' ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uRange: {
					value: range,
					type: "3f"
				},
			}, this.gpu.uniforms ),
			vert: MXP.hotGet( 'trailsVert', trailsVert ),
			frag: MXP.hotGet( 'trailsFrag', trailsFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( [ "./shaders/trails.vs", "./shaders/trails.fs" ], ( module ) => {

				if ( module[ 0 ] ) {

					mat.vert = MXP.hotUpdate( 'trailsVert', module[ 0 ].default );

				}

				if ( module[ 1 ] ) {

					mat.frag = MXP.hotUpdate( 'trailsFrag', module[ 1 ].default );

				}

				mat.requestUpdate();

			} );

			import.meta.hot.accept( "./shaders/trailsCompute.glsl", ( module ) => {

				if ( module ) {

					this.gpu.frag = MXP.hotUpdate( "trailsCompute", module.default );
					this.gpu.requestUpdate();

				}

			} );

		}

	}

	protected appendBlidgerImpl( blidger: MXP.BLidger ): void {

		this.gpu.uniforms = GLP.UniformsUtils.merge( this.gpu.uniforms, blidger.uniforms );

	}

}
