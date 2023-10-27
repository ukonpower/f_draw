import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class MIDIMIX extends GLP.EventEmitter {

	public input: MIDIInput | null;
	public output: MIDIOutput | null;

	public values: GLP.Vector[];

	public row1: number;
	public row2: number;

	constructor() {

		super();

		// values

		this.values = [];

		this.input = null;
		this.output = null;

		for ( let i = 0; i < 8; i ++ ) {

			this.values.push( new GLP.Vector() );

		}

		this.row1 = 0;
		this.row2 = 0;

		// midi

		navigator.requestMIDIAccess().then( ( m ) => {

			m.inputs.forEach( item => {

				if ( item.name == "MIDI Mix" ) {

					this.input = item;

				}

			} );

			if ( this.input ) {

				this.input.onmidimessage = this.onMidiMessage.bind( this ) as any;

			}

			m.outputs.forEach( item => {

				if ( item.name == "MIDI Mix" ) {

					this.output = item;

				}


			} );

			// init

			this.updateLight();
			this.pushRow1( this.row1 );
			this.pushRow2( this.row2 );

			for ( let i = 0; i < 8; i ++ ) {

				this.emit( "value/" + i, [ this.values[ i ] ] );

			}

		} );

		// keyboard simulator

		const onKeyDown = ( e: KeyboardEvent ) => {

			const num = Number( e.key );

			if ( ! Number.isNaN( num ) ) {

				this.pushRow1( num );

			}

		};

		window.addEventListener( 'keydown', onKeyDown );

		this.once( "dispose", () => {

			window.removeEventListener( "keydown", onKeyDown );

		} );

	}

	private onMidiMessage( e: MIDIMessageEvent ) {

		const type = e.data[ 0 ];
		let id = e.data[ 1 ];
		const value = e.data[ 2 ] / 127;

		// value

		if ( type == 176 && ( 16 <= id && id <= 31 || 46 <= id && id <= 61 ) ) {

			if ( 46 <= id ) id -= 14;

			const index = Math.floor( ( id - 16 ) / 4 );

			const vec = this.values[ index ];

			const dim = id % 4;

			if ( dim == 0 ) {

				vec.x = value;

			} else if ( dim == 1 ) {

				vec.y = value;

			} else if ( dim == 2 ) {

				vec.z = value;

			} else {

				vec.w = value;

			}

			this.emit( "value/" + index + '/' + dim, [ value ] );

			return;

		}

		// buttons

		if ( type == 144 ) {

			const num = Math.floor( id / 3 );

			if ( ( id + 2 ) % 3 == 0 ) {

				this.pushRow1( num );

			} else {

				this.pushRow2( num - 1 );

			}

			this.updateLight();

		}

	}

	public pushRow1( index: number ) {

		this.row1 = index;

		this.emit( "row1", [ this.row1 ] );

	}

	public pushRow2( index: number ) {

		this.row2 = index;

		this.emit( "row2", [ this.row2 ] );

	}

	private updateLight() {

		if ( ! this.output ) return;

		for ( let i = 0; i < 8; i ++ ) {

			this.output.send( [ 0x90, 1 + i * 3, 0 ] );

		}

		for ( let i = 0; i < 8; i ++ ) {

			this.output.send( [ 0x90, 3 + i * 3, 0 ] );

		}

		this.output.send( [ 0x90, 1 + ( this.row1 ) * 3.0, 127 ] );
		this.output.send( [ 0x90, ( this.row2 + 1 ) * 3.0, 127 ] );

	}

	public dispose() {

		this.emit( "dispose" );

	}

}
