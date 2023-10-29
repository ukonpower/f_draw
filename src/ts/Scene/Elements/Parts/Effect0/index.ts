import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Part } from '..';
import { Trails } from '~/ts/Scene/Entities/Trails';

export class Effect0 extends Part {

	constructor() {

		super( 4 );

		const trail = new Trails();
		this.add( trail );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.emit( 'update' );

	}

}
