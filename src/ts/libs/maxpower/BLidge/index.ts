import * as GLP from 'glpower';

export type BLidgeNodeType = 'empty' | 'cube' | 'sphere' | 'cylinder' | 'mesh' | 'camera' | 'plane' | 'light';

// scene

export type BLidgeSceneParam = {
    animations: {[key: string]: BLidgeCurveParam[]};
	root: BLidgeNodeParam;
	frame: BLidgeFrame;
}

// node

export type BLidgeNodeParam = {
	name: string,
	class: string,
	type: BLidgeNodeType,
	param?: BLidgeCameraParam | BLidgeMeshParamRaw | BLidgeLightParamCommon
	parent: string,
	children?: BLidgeNodeParam[],
	animation?: BLidgeAnimationAccessor,
	position: GLP.IVector3,
	rotation: GLP.IVector3,
	scale: GLP.IVector3,
	material?: {
		name?: string,
		uniforms?: BLidgeAnimationAccessor
	},
	visible: boolean,
}

export type BLidgeNode = {
	name: string,
	class: string,
	type: BLidgeNodeType,
	param?: BLidgeCameraParam | BLidgeMeshParam | BLidgeLightParamCommon
	parent: string,
	children: BLidgeNode[],
	animation: BLidgeAnimationAccessor,
	position: number[],
	rotation: number[],
	scale: number[],
	material: BLidgeMaterialParam
	visible: boolean,
}

// camera

export type BLidgeCameraParam = {
	fov: number
}

// mesh

export type BLidgeMeshParamRaw = {
	position: string,
	uv: string,
	normal: string,
	index: string,
}

export type BLidgeMeshParam = {
	position: Float32Array,
	uv: Float32Array,
	normal: Float32Array,
	index: Uint16Array,
}

// light

type BLidgeLightParamCommon = {
	type: 'directional' | 'spot'
	color: GLP.IVector3,
	intensity: number,
	shadowMap: boolean,
}

export type BLidgeDirectionalLightParam = {
	type: 'directional'
} & BLidgeLightParamCommon

export type BLidgeSpotLightParam = {
	type: 'spot',
	angle: number,
	blend: number,
} & BLidgeLightParamCommon

export type BLidgeLightParam = BLidgeDirectionalLightParam | BLidgeSpotLightParam;

// material

export type BLidgeMaterialParam = {
	name: string,
	uniforms: BLidgeAnimationAccessor
}

// animation

export type BLidgeAnimationAccessor = { [key: string]: string }

export type BLidgeCurveAxis = 'x' | 'y' | 'z' | 'w'

export type BLidgeCurveParam = {
    k: BLidgeKeyFrameParam[];
	axis: BLidgeCurveAxis
}

export type BLidgeKeyFrameParam = {
    c: number[];
    h_l?: number[];
    h_r?: number[];
    e: string;
    i: "B" | "L" | "C";
}

// message

export type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncTimelineMessage

export type BLidgeSyncSceneMessage = {
	type: "sync/scene",
    data: BLidgeSceneParam;
}

export type BLidgeSyncTimelineMessage = {
	type: "sync/timeline";
	data: BLidgeFrame;
}

// frame

export type BLidgeFrame = {
	start: number;
	end: number;
	current: number;
	fps: number;
	playing: boolean;
}

export class BLidge extends GLP.EventEmitter {

	// ws

	private url?: string;
	private ws?: WebSocket;
	public connected: boolean = false;

	// frame

	public frame: BLidgeFrame = {
		start: - 1,
		end: - 1,
		current: - 1,
		fps: - 1,
		playing: false,
	};

	// animation

	public nodes: BLidgeNode[] = [];
	public curveGroups: GLP.FCurveGroup[] = [];
	public root: BLidgeNode | null;

	constructor( url?: string ) {

		super();

		this.root = null;

		if ( url ) {

			this.url = url;
			this.connect( this.url );

		}

	}

	/*-------------------------------
		Connect
	-------------------------------*/

	public connect( url: string ) {

		this.url = url;
		this.ws = new WebSocket( this.url );
		this.ws.onopen = this.onOpen.bind( this );
		this.ws.onmessage = this.onMessage.bind( this );
		this.ws.onclose = this.onClose.bind( this );

		this.ws.onerror = ( e ) => {

			console.error( e );

			this.emit( 'error' );

		};

	}

	/*-------------------------------
		Load
	-------------------------------*/

	private binaryStringToArrayBuffer( binaryString: string ) {

		const bytes = new Uint8Array( binaryString.length );

		for ( let i = 0; i < binaryString.length; i ++ ) {

			const code = binaryString.charCodeAt( i );
			bytes[ i ] = code;

		}

		return bytes.buffer;

	}

	public loadJsonScene( jsonPath: string ) {

		const req = new XMLHttpRequest();

		req.onreadystatechange = () => {

			if ( req.readyState == 4 ) {

				if ( req.status == 200 ) {

					this.loadScene( JSON.parse( req.response ) );

				}

			}

		};

		req.open( 'GET', jsonPath );
		req.send( );

	}

	public loadScene( data: BLidgeSceneParam ) {

		// frame

		this.frame.start = data.frame.start;
		this.frame.end = data.frame.end;
		this.frame.fps = data.frame.fps;

		this.curveGroups.length = 0;
		this.nodes.length = 0;

		// actions

		const fcurveGroupNames = Object.keys( data.animations );

		for ( let i = 0; i < fcurveGroupNames.length; i ++ ) {

			const fcurveGroupName = fcurveGroupNames[ i ];
			const fcurveGroup = new GLP.FCurveGroup( fcurveGroupName );

			data.animations[ fcurveGroupName ].forEach( fcurveData => {

				const curve = new GLP.FCurve();

				curve.set( fcurveData.k.map( frame => {

					const interpolation = {
						"B": "BEZIER",
						"C": "CONSTANT",
						"L": "LINEAR",
					}[ frame.i ];

					return new GLP.FCurveKeyFrame(
						{ x: frame.c[ 0 ], y: frame.c[ 1 ] },
						frame.h_l && { x: frame.h_l[ 0 ], y: frame.h_l[ 1 ] },
						frame.h_r && { x: frame.h_r[ 0 ], y: frame.h_r[ 1 ] },
					interpolation as GLP.FCurveInterpolation );

				} ) );

				fcurveGroup.setFCurve( curve, fcurveData.axis );

			} );

			this.curveGroups.push( fcurveGroup );

		}

		// node

		this.nodes.length = 0;

		const _ = ( nodeParam: BLidgeNodeParam ): BLidgeNode => {

			const mat = { name: '', uniforms: {} };

			if ( nodeParam.material ) {

				mat.name = nodeParam.material.name || '';
				mat.uniforms = nodeParam.material.uniforms || {};

			}

			const node: BLidgeNode = {
				name: nodeParam.name,
				class: nodeParam.class,
				parent: nodeParam.parent,
				children: [],
				animation: nodeParam.animation || {},
				position: nodeParam.position || new GLP.Vector(),
				rotation: nodeParam.rotation || new GLP.Vector(),
				scale: nodeParam.scale || new GLP.Vector(),
				material: mat,
				type: nodeParam.type,
				visible: nodeParam.visible,
			};

			const param = nodeParam.param;

			if ( param && "position" in param ) {

				node.param = {
					position: new Float32Array( this.binaryStringToArrayBuffer( atob( param.position ) ) ),
					normal: new Float32Array( this.binaryStringToArrayBuffer( atob( param.normal ) ) ),
					uv: new Float32Array( this.binaryStringToArrayBuffer( atob( param.uv ) ) ),
					index: new Uint16Array( this.binaryStringToArrayBuffer( atob( param.index ) ) ),
				};

			} else {

				node.param = param;

			}

			if ( nodeParam.children ) {

				nodeParam.children.forEach( item => {

					node.children.push( _( item ) );

				} );

			}

			this.nodes.push( node );

			return node;

		};

		this.root = _( data.root );

		// dispatch event

		this.emit( 'sync/scene', [ this ] );

	}

	private onSyncTimeline( data: BLidgeFrame ) {

		this.frame = data;

		this.emit( 'sync/timeline', [ this.frame ] );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen( event: Event ) {

		this.connected = true;

	}

	private onMessage( e: MessageEvent ) {

		const msg = JSON.parse( e.data ) as BLidgeMessage;

		if ( msg.type == 'sync/scene' ) {

			this.loadScene( msg.data );

		} else if ( msg.type == "sync/timeline" ) {

			this.onSyncTimeline( msg.data );

		}

	}

	private onClose( e:CloseEvent ) {

		this.disposeWS();

	}

	/*-------------------------------
		API
	-------------------------------*/

	public getCurveGroup( name: string ) {

		return this.curveGroups.find( curve => curve.name == name );

	}

	public setFrame( frame: number ) {

		this.onSyncTimeline( {
			...this.frame,
			playing: true,
			current: frame,
		} );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disposeWS();

	}

	public disposeWS() {

		if ( this.ws ) {

			this.ws.close();
			this.ws.onmessage = null;
			this.ws.onclose = null;
			this.ws.onopen = null;

			this.connected = false;

		}

	}

}
