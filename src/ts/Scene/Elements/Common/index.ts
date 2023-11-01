import * as MXP from 'maxpower';
import { Skybox } from '../../Entities/Skybox';
import { AudioWave } from '../../Entities/AudioWave';
import { Lights } from './Lights/inded';
import { DustParticles } from '../../Entities/DustParticles';
import { CubeWire } from '../../Entities/CubeWire';
import { HUD } from '../../Entities/HUD';

export class Common extends MXP.Entity {

	private lights: Lights;
	private wireCube: CubeWire;

	constructor() {

		super();

		this.lights = new Lights();
		this.add( this.lights );

		const skybox = new Skybox();
		this.add( skybox );

		const dust = new DustParticles();
		this.add( dust );

		const wave = new AudioWave();
		wave.scale.set( 20.0, 20.0, 20.0 );
		this.add( wave );

		this.wireCube = new CubeWire();
		this.wireCube.scale.set( 5.0, 5.0, 5.0 );
		this.add( this.wireCube );

		const hud = new HUD();
		this.add( hud );


	}

}
