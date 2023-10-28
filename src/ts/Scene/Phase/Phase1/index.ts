import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';
import { OctreeCube } from '../../Entities/OctreeCube';

export class Phase1 extends Phase {

	private box: MXP.Entity;

	constructor() {

		super( 1 );

		this.box = new OctreeCube();
		this.add( this.box );
		this.box.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

		this.on( 'update', () => {

			this.box.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.005, 0.003, 0.001 ) ) );

		} );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.emit( 'update' );

	}

}
