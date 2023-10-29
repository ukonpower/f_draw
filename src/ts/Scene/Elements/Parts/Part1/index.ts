import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { OctreeCube } from '~/ts/Scene/Entities/OctreeCube';
import { Part } from '..';


export class Part1 extends Part {

	private octreeCube: MXP.Entity;

	constructor() {

		super( 1 );

		this.octreeCube = new OctreeCube();
		this.add( this.octreeCube );
		this.octreeCube.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		// scale

		this.scale.set( this.switcher.visibility );

		this.octreeCube.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.005, 0.003, 0.001 ) ) );
		this.octreeCube.quaternion.multiply( this.switcher.rotQua );

	}

}
