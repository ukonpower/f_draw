import * as GLP from 'glpower';

import { Component, ComponentResizeEvent } from '..';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam {
	input?: GLP.GLPowerTexture[];
	passes: PostProcessPass[];
}

let postProcessId = 0;

export class PostProcess extends Component {

	public uuid: number;
	public passes: PostProcessPass[];
	public input: GLP.GLPowerTexture[];
	public output: GLP.GLPowerFrameBuffer | null;

	constructor( param: PostProcessParam ) {

		super();

		this.uuid = postProcessId ++;

		this.passes = param.passes;

		this.input = param.input || [];

		this.output = this.passes[ this.passes.length - 1 ].renderTarget;

	}

	protected resizeImpl( event: ComponentResizeEvent ): void {

		for ( let i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].resize( event );

		}

	}

}
