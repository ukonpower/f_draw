import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gridCubeVert from './shaders/gridCube.vs';
import gridCubeFrag from './shaders/gridCube.fs';

import { globalUniforms } from '~/ts/Globals';

export class GridCube extends MXP.Entity {

	constructor() {

		super();

		const res = 15;

		const geo = this.addComponent( "geometry", new MXP.CubeGeometry( 1 / res, 1 / res, 1 / res ) );

		const positionArray = [];
		const normalArray = [];
		const idArray = [];

		let c = 0;

		for ( let i = 0; i < res; i ++ ) {

			for ( let j = 0; j < res; j ++ ) {

				positionArray.push(
					i / ( res - 1 ) - 0.5,
					j / ( res - 1 ) - 0.5,
					0.5
				);
				normalArray.push(
					0.0, 0.0, 1.0,
				);
				idArray.push(
					Math.random(), Math.random(), c );

				positionArray.push(
					i / ( res - 1 ) - 0.5,
					j / ( res - 1 ) - 0.5,
					- 0.5
				);
				normalArray.push(
					0.0, 0.0, - 1.0,
				);
				idArray.push( Math.random(), Math.random(), c );

				c ++;

			}

		}

		for ( let i = 0; i < res; i ++ ) {

			for ( let j = 0; j < res; j ++ ) {

				positionArray.push(
					i / ( res - 1 ) - 0.5,
					0.5,
					j / ( res - 1 ) - 0.5,
				);
				normalArray.push(
					0.0, 1.0, 0.0,
				);
				idArray.push( Math.random(), Math.random(), c );

				positionArray.push(
					i / ( res - 1 ) - 0.5,
					- 0.5,
					j / ( res - 1 ) - 0.5,
				);
				normalArray.push(
					0.0, - 1.0, 0.0,
				);
				idArray.push( Math.random(), Math.random(), c );

				c ++;

			}

		}

		for ( let i = 0; i < res; i ++ ) {

			for ( let j = 0; j < res; j ++ ) {

				positionArray.push(
					0.5,
					i / ( res - 1 ) - 0.5,
					j / ( res - 1 ) - 0.5,
				);
				normalArray.push(
					1.0, 0.0, 0.0,
				);
				idArray.push( Math.random(), Math.random(), c );

				positionArray.push(
					- 0.5,
					i / ( res - 1 ) - 0.5,
					j / ( res - 1 ) - 0.5,
				);
				normalArray.push(
					- 1.0, 0.0, 0.0,
				);
				idArray.push( Math.random(), Math.random(), c );

				c ++;

			}

		}

		geo.setAttribute( "instancePos", new Float32Array( positionArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "instanceNormal", new Float32Array( normalArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "id", new Float32Array( idArray ), 3, { instanceDivisor: 1 } );

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "gridCube",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.audio, globalUniforms.tex, {
				uGrid: {
					value: res,
					type: "1f"
				},
			} ),
			vert: MXP.hotGet( 'gridCubeVert', gridCubeVert ),
			frag: MXP.hotGet( 'gridCubeFrag', gridCubeFrag ),
		} ) );

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


		}

	}

}
