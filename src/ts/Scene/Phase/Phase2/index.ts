import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';

export class Phase2 extends Phase {

	constructor() {

		super( 2 );

		// const box = new GridCube();
		// this.add( box );

		const box = new MXP.Entity();
		box.addComponent( "material", new MXP.Material( {} ) );
		box.addComponent( "geometry", new MXP.CylinderGeometry() );
		this.add( box );

		box.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

		this.on( 'update', () => {

			box.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.005, 0.003, 0.001 ) ) );

		} );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.emit( 'update' );

	}

}
