import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Skybox } from '../../Entities/Skybox';
import { AudioWave } from '../../Entities/AudioWave';
import { Lights } from './Lights/inded';
import { DustParticles } from '../../Entities/DustParticles';
import { Trails } from '../../Entities/Trails';

export class Common extends MXP.Entity {

	private lights: Lights;

	constructor() {

		super();

		this.lights = new Lights();
		this.add( this.lights );

		const skybox = new Skybox();
		this.add( skybox );

		const dust = new DustParticles();
		this.add( dust );

		const wave = new AudioWave();
		wave.position.z = - 2;
		this.add( wave );

		const trail = new Trails();
		this.add( trail );

	}

}
