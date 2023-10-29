import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Part } from '..';
import { FluidParticles } from '~/ts/Scene/Entities/FluidParticles';

export class Effect1 extends Part {

	constructor() {

		super( 5 );

		const trail = new FluidParticles();
		this.add( trail );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		super.updateImpl( event );

		this.emit( 'update' );

	}

}
