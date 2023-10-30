import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { GridCube } from '~/ts/Scene/Entities/GridCube';
import { Part } from '..';
import { GridTrees } from '~/ts/Scene/Entities/GridTrees';

export class Part0 extends Part {

	private gridCube: GridCube;
	private gridTrees: GridTrees;

	constructor() {

		super( 0 );

		this.gridCube = new GridCube();
		this.add( this.gridCube );
		this.gridCube.quaternion.setFromEuler( new GLP.Euler( 1, 1, 1 ) );

		this.gridTrees = new GridTrees();
		this.add( this.gridTrees );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		const v = this.switcher.visibility;

		// gridcube

		this.gridCube.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.005, 0.003, 0.001 ) ) );
		this.gridCube.quaternion.multiply( this.switcher.rotQua );
		this.gridCube.scale.set( v, v, v );

	}

}
