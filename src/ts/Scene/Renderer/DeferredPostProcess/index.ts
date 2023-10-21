import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import deferredShadingFrag from './shaders/deferredShading.fs';
import { RenderCameraTarget } from '~/ts/libs/maxpower/Component/Camera/RenderCamera';

export class DeferredPostProcess extends MXP.PostProcess {

	private shading: MXP.PostProcessPass;

	constructor() {

		const shading = new MXP.PostProcessPass( {
			name: "deferredShading",
			frag: deferredShadingFrag,
		} );

		super( { passes: [
			shading,
		] } );

		this.shading = shading;

	}

	public setRenderTarget( renderTarget: RenderCameraTarget ) {

		renderTarget.gBuffer.textures.forEach( ( tex, index ) => {

			this.shading.uniforms[ "sampler" + index ] = {
				type: '1i',
				value: tex
			};

		} );

		this.shading.renderTarget = renderTarget.deferredBuffer;

	}

}
