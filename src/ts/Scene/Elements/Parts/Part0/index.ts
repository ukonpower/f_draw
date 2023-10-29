import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { GridCube } from '~/ts/Scene/Entities/GridCube';
import { Part } from '..';
import { CubeWire } from '~/ts/Scene/Entities/CubeWire';

export class Part0 extends Part {

	private gridCube: GridCube;
	private wireCube: CubeWire;

	constructor() {

		super( 0 );

		this.gridCube = new GridCube();
		this.add( this.gridCube );
		this.gridCube.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.scale.set( this.switcher.visibility );

		this.gridCube.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.005, 0.003, 0.001 ) ) );
		this.gridCube.quaternion.multiply( this.switcher.rotQua );


	}

}