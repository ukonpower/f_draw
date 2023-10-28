import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class Lights extends MXP.Entity {

	constructor() {

		super();

		const light = new MXP.Entity();
		light.position.set( 0, 5, - 2 );
		light.addComponent( "light", new MXP.Light( {
			lightType: "spot",
			intensity: 7,
			blend: 1,
			angle: Math.PI / 2 * 0.8,
			useShadowMap: true,
		} ) );
		light.quaternion.setFromEuler( new GLP.Euler( - Math.PI / 8, 0.0, 0.0 ) );

		this.add( light );

		const light2 = new MXP.Entity();
		light2.position.set( 1, 2, 3 );
		light2.addComponent( "light", new MXP.Light( {
			lightType: "spot",
			intensity: 1.0,
			blend: 1.0,
			angle: Math.PI / 2 * 0.8,
			useShadowMap: true,
		} ) );
		light2.quaternion.setFromEuler( new GLP.Euler( Math.PI / 5, Math.PI / 2, 0.0 ) );
		this.add( light2 );


	}

}
