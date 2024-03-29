import * as GLP from 'glpower';

import { Entity, EntityResizeEvent, EntityUpdateEvent } from '../Entity';

export type ComponentUpdateEvent = EntityUpdateEvent & {
	entity: Entity,
}

export type ComponentResizeEvent = EntityResizeEvent & {
	entity: Entity,
}

export type BuiltInComponents =
	'camera' |
	'cameraShadowMap' |
	'perspective' |
	"orthographic" |
	'material' |
	'geometry' |
	'light' |
	'blidger' |
	'postprocess' |
	'gpuCompute' |
( string & {} );

export class Component extends GLP.EventEmitter {

	protected entity: Entity | null;

	constructor() {

		super();

		this.entity = null;

	}

	public setEntity( entity: Entity | null ) {

		const beforeEntity = this.entity;

		this.entity = entity;

		this.setEntityImpl( this.entity, beforeEntity );

	}

	public preUpdate( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.preUpdateImpl( event );

		}

	}

	public update( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.updateImpl( event );

		}

	}

	public afterUpdate( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.afterUpdateImpl( event );

		}

	}

	public resize( event: ComponentResizeEvent ) {

		if ( this.entity ) {

			this.resizeImpl( event );

		}

	}

	protected setEntityImpl( entity: Entity | null, prevEntity: Entity | null ) {}

	protected preUpdateImpl( event: ComponentUpdateEvent ) {}

	protected updateImpl( event: ComponentUpdateEvent ) {}

	protected afterUpdateImpl( event: ComponentUpdateEvent ) {}

	protected resizeImpl( event: ComponentResizeEvent ) {}

	public dispose() {

		this.emit( 'dispose' );

	}

}
