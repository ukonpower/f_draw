import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';
import { GridCube } from '../../Entities/GridCube';

export class Phase1 extends Phase {

	constructor() {

		super( );

		const light = new MXP.Entity();
		light.position.set( 0, 5, 0 );
		light.addComponent( "light", new MXP.Light( {
			lightType: "spot",
			intensity: 4,
			blend: 1,
			angle: Math.PI / 2 * 0.8,
			useShadowMap: true,
		} ) );
		this.add( light );

		const light2 = new MXP.Entity();
		light2.position.set( 1, 2, 3 );
		light2.addComponent( "light", new MXP.Light( {
			lightType: "spot",
			intensity: 1.0,
			blend: 1.0,
			angle: Math.PI / 2 * 0.8,
			useShadowMap: true,
		} ) );
		light2.quaternion.setFromEuler( new GLP.Euler( Math.PI / 5, Math.PI / 4, 0.0 ) );
		this.add( light2 );

		const box = new GridCube();
		// box.scale.set( 0.3, 0.3, 0.3 );
		this.add( box );
		box.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

		this.on( 'update', () => {

			box.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.005, 0.003, 0.001 ) ) );

		} );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		this.emit( 'update' );

	}

}
