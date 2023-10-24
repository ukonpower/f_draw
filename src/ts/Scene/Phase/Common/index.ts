import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Skybox } from '../../Entities/Skybox';
import { AudioWave } from '../../Entities/AudioWave';
import { Lights } from './Lights/inded';

export class Common extends MXP.Entity {

	private lights: Lights;

	constructor() {

		super();

		this.lights = new Lights();
		this.add( this.lights );

		const skybox = new Skybox();
		this.add( skybox );

		const aw = new AudioWave();
		aw.position.z = - 2;
		this.add( aw );

	}

}
