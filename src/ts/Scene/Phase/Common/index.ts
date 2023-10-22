import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Skybox } from '../../Entities/Skybox';
import { AudioWave } from '../../Entities/AudioWave';

export class Common extends MXP.Entity {

	constructor() {

		super();

		const skybox = new Skybox();
		this.add( skybox );

		const aw = new AudioWave();
		aw.position.z = - 2;
		this.add( aw );

	}

}
