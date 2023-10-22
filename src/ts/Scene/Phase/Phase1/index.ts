import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Phase } from '..';

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

		const box = new MXP.Entity();
		box.addComponent( "geometry", new MXP.CubeGeometry() );
		box.addComponent( "material", new MXP.Material( {} ) );
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