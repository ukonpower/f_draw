import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import deferredShadingFrag from './shaders/deferredShading.fs';
import { RenderCameraTarget } from '~/ts/libs/maxpower/Component/Camera/RenderCamera';
import { globalUniforms } from '~/ts/Globals';

export class DeferredPostProcess extends MXP.PostProcess {

	private shading: MXP.PostProcessPass;

	constructor() {

		const shading = new MXP.PostProcessPass( {
			name: "deferredShading",
			frag: MXP.hotGet( "deferredShading", deferredShadingFrag ),
			uniforms: GLP.UniformsUtils.merge( {
				uEnvTex: globalUniforms.tex.uEnvTex
			} ),
			defines: {
				USE_ENV: ""
			}
		} );

		super( { passes: [
			shading,
		] } );

		this.shading = shading;

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/deferredShading.fs", ( module ) => {

				if ( module ) {

					shading.frag = MXP.hotUpdate( 'deferredShading', module.default );

				}

				shading.requestUpdate();

			} );

		}

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
