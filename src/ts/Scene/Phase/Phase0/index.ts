import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';
import { GridCube } from '../../Entities/GridCube';

export class Phase0 extends Phase {

	constructor() {

		super( 0 );

		const box = new GridCube();
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
