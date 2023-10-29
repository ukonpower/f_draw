import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Part } from '..';
import { Trails } from '~/ts/Scene/Entities/Trails';

export class Effect0 extends Part {

	private trail: Trails;

	constructor() {

		super( 4 );

		this.trail = new Trails();
		this.add( this.trail );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.trail.trailVisibility = this.switcher.visibility;

	}

}
