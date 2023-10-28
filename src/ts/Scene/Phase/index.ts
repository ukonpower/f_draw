import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { animator, midimix } from '~/ts/Globals';

export class Phase extends MXP.Entity {

	protected readonly phaseId: string;
	protected readonly phaseNumber: number;

	private rot: GLP.Euler;
	private rotQua: GLP.Quaternion;

	private visiblePrev: number;
	private visibleRotVel: number = 0;

	constructor( phaseNumber: number ) {

		super();

		this.phaseNumber = phaseNumber;
		this.phaseId = "phase/" + this.uuid;

		this.rot = new GLP.Euler();
		this.rotQua = new GLP.Quaternion();

		// visible

		this.visible = false;
		animator.add( this.phaseId, 0, GLP.Easings.easeInOutCubic );
		this.visiblePrev = 0;

		// events

		const onRow1 = this.phaseChange.bind( this );

		midimix.on( "row1", onRow1 );

		this.once( "dispose", () => {

			midimix.off( "row1", onRow1 );

		} );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		const visibility = animator.getValue<number>( this.phaseId ) !;
		const visibilityDiff = Math.abs( this.visiblePrev - visibility );
		this.visiblePrev = visibility;

		this.visibleRotVel += visibilityDiff * 25.0;

		this.visibleRotVel *= 0.95;

		// scale

		this.scale.set( visibility );

		// rot

		this.rot.set( this.visibleRotVel * event.deltaTime, 0, 0 );
		this.rotQua.setFromEuler( this.rot );
		this.quaternion.multiply( this.rotQua );

	}

	protected phaseChange( phase: number ) {

		const d = .5;

		if ( this.phaseNumber == phase ) {

			this.visible = true;

			animator.animate( this.phaseId, 1, 5 * d, () => {

			} );

		} else {

			animator.animate( this.phaseId, 0, 5 * d, () => {

				this.visible = false;

			} );

		}

	}

}
