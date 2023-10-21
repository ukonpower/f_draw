import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';

export class Phase1 extends Phase {

	constructor() {

		super( );

		const light = new MXP.Entity();
		light.position.set( 0, 10, 0 );
		light.addComponent( "light", new MXP.Light( {
			lightType: "spot",
			intensity: 2,
			blend: 1,
		} ) );
		this.add( light );

		const box = new MXP.Entity();
		box.addComponent( "geometry", new MXP.CubeGeometry() );
		box.addComponent( "material", new MXP.Material( {} ) );
		this.add( box );

		box.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

		this.on( 'update', () => {

			box.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.01, 0.001, 0.01 ) ) );

		} );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		this.emit( 'update' );

	}

}
