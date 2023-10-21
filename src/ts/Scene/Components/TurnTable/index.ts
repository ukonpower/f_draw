import * as GLP from 'glpower';
import { Component, ComponentUpdateEvent } from 'maxpower/Component';

export class TurnTable extends Component {

	private speed: number;

	private rotQuaternion: GLP.Quaternion;

	constructor( speed: number = 1.0 ) {

		super();

		this.speed = speed;

		this.rotQuaternion = new GLP.Quaternion();

	}

	protected updateImpl( event: ComponentUpdateEvent ): void {

		const entity = event.entity;

		this.rotQuaternion.setFromEuler( new GLP.Euler( 0, - 0.4 * event.deltaTime * this.speed, 0 ) );

		entity.quaternion.multiply( this.rotQuaternion );

	}


}
