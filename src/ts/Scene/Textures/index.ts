import { audio, globalUniforms } from "~/ts/Globals";
import { TexProcedural } from "~/ts/libs/TexProcedural";

import noiseFrag from './shaders/noise.fs';

export const createTextures = () => {

	globalUniforms.tex.uNoiseTex = {
		value: new TexProcedural( {
			frag: noiseFrag
		} ),
		type: '1i'
	};

	globalUniforms.audio.uAudioWaveTex = {
		value: audio.timeDomainTexture,
		type: '1i'
	};

	globalUniforms.audio.uAudioFreqTex = {
		value: audio.frequencyTexture,
		type: '1i'
	};

};
