import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';
import { GridCube } from '../../Entities/GridCube';

export class Phase1 extends Phase {

	constructor() {

		super( );

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
