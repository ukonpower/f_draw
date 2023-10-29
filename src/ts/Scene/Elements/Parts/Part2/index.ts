import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Part } from '..';

export class Part2 extends Part {

	constructor() {

		super( 2 );

		const box = new MXP.Entity();
		box.addComponent( "material", new MXP.Material( {} ) );
		box.addComponent( "geometry", new MXP.CylinderGeometry() );
		this.add( box );

		box.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.emit( 'update' );

	}

}
