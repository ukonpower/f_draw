import * as GLP from 'glpower';

import skyFrag from './shaders/sky.fs';
import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';
import { Entity } from 'maxpower/Entity';

export class Sky extends Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "cave",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'skyFrag', skyFrag )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/sky.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'skyFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
