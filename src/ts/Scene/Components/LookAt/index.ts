import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class LookAt extends MXP.Component {

	private target: MXP.Entity | null;

	private up: GLP.Vector;
	private entityWorldPos: GLP.Vector;
	private targetWorldPos: GLP.Vector;

	public enable: boolean;

	constructor() {

		super();

		this.target = null;
		this.enable = true;
		this.entityWorldPos = new GLP.Vector();
		this.targetWorldPos = new GLP.Vector();
		this.up = new GLP.Vector( 0.0, 1.0, 0.0 );

	}

 	public setTarget( target: MXP.Entity | null ) {

		this.target = target;

	}

	protected setEntityImpl( entity: MXP.Entity | null ): void {

		this.emit( "setEntity" );

		const onUpdate = this.calcMatrix.bind( this );

		if ( entity ) {

			entity.on( 'notice/finishUp', onUpdate );

		}

		this.once( "setEntity", () => {

			if ( entity ) {

				entity.off( 'notice/finishUp', onUpdate );

			}

		} );

	}

	private calcMatrix() {

		if ( this.entity && this.target && this.enable ) {

			this.entity.matrixWorld.decompose( this.entityWorldPos );
			this.target.matrixWorld.decompose( this.targetWorldPos );

			this.entity.matrixWorld.lookAt( this.entityWorldPos, this.targetWorldPos, this.up );

			const camera = this.entity.getComponent<MXP.Camera>( 'camera' );

			if ( camera ) {

				camera.viewMatrix.copy( this.entity.matrixWorld ).inverse();

			}

		}

	}

}
