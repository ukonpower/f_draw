import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Skybox } from '../../Skybox';

export class Common extends MXP.Entity {

	constructor() {

		super();

		const skybox = new Skybox();
		this.add( skybox );

	}

}
