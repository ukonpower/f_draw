import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gridCubeVert from './shaders/gridCube.vs';
import gridCubeFrag from './shaders/gridCube.fs';

import gridCubeCompute from './shaders/gridCubeCompute.glsl';

import { gl, globalUniforms } from '~/ts/Globals';
import { gridCubeInstance } from './instance';

export class GridCube extends MXP.Entity {

	private gpu: MXP.GPUComputePass;

	constructor() {

		super();

		const res = 3;

		const count = new GLP.Vector( res * res, res );

		const commonUnforms: GLP.Uniforms = {
			uGrid: {
				value: res,
				type: "1f"
			},
			uGridInv: {
				value: 1.0 / res,
				type: "1f"
			},
		};

		/*-------------------------------
			GPU
		-------------------------------*/

		this.gpu = new MXP.GPUComputePass( gl, {
			name: 'gpu/GridCube',
			size: count,
			layerCnt: 2,
			frag: MXP.hotGet( "paraCompute", gridCubeCompute ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, commonUnforms ),
		} );

		this.gpu.initTexture( ( l, x, y ) => {

			if ( l == 0 ) {

				return [ 0, 0, 0, Math.random() ];

			} else {

				return [ 0, 0, 0, Math.random() ];

			}

		} );

		this.addComponent( "gpuCompute", new MXP.GPUCompute( { passes: [
			this.gpu
		] } ) );

		/*-------------------------------
			Geometry
		-------------------------------*/

		const geo = this.addComponent( "geometry", new MXP.CubeGeometry( 1 / res, 1 / res, 1 / res ) );

		const { positionArray, normalArray, idArray, randomArray } = gridCubeInstance( res );

		geo.setAttribute( "instancePos", new Float32Array( positionArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "instanceNormal", new Float32Array( normalArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "instanceId", new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
		geo.setAttribute( "instanceRandom", new Float32Array( randomArray ), 3, { instanceDivisor: 1 } );

		/*-------------------------------
			Material
		-------------------------------*/

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "gridCube",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.audio, globalUniforms.tex, this.gpu.outputUniforms, commonUnforms ),
			vert: MXP.hotGet( 'gridCubeVert', gridCubeVert ),
			frag: MXP.hotGet( 'gridCubeFrag', gridCubeFrag ),
		} ) );

		/*-------------------------------
			Hot
		-------------------------------*/

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/gridCube.vs", ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'gridCubeVert', module.default );

				}

				mat.requestUpdate();

			} );

			import.meta.hot.accept( "./shaders/gridCube.fs", ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'gridCubeFrag', module.default );

				}

				mat.requestUpdate();

			} );

			import.meta.hot.accept( "./shaders/gridCubeCompute.glsl", ( module ) => {

				if ( module ) {

					this.gpu.frag = MXP.hotUpdate( 'gridCubeCompute', module.default );

				}

				this.gpu.requestUpdate();

			} );


		}

	}

}
