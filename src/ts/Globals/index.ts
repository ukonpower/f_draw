import * as GLP from 'glpower';
import { Audio } from '../libs/Audio';
import { MIDIMIX } from '../libs/MIDIMIX';

export const canvas = document.createElement( "canvas" );
export const gl = canvas.getContext( 'webgl2' )!;
export const midimix = new MIDIMIX();
export const mpkmini = new MPKMini();
export const lpd8 = new LPD8();
export const animator = new GLP.Animator();
export const power = new GLP.Power( gl );
export const audio = new Audio();
export const bpm = new BPM();
export const tmpVector = new GLP.Vector();
export const globalUniforms: {[key: string]: GLP.Uniforms} = {
	time: {
		uTime: {
			value: 0,
			type: "1f"
		},
		uFractTime: {
			value: 0,
			type: "1f"
		},
		uTimeSeq: {
			value: 0,
			type: "1f"
		},
		uTimeSeqPrev: {
			value: 0,
			type: "1f"
		},
		uMove: {
			value: 0,
			type: "1f"
		}
	},
	resolution: {
		uResolution: {
			value: new GLP.Vector(),
			type: '2fv'
		},
		uAspectRatio: {
			value: 1.0,
			type: '1f'
		}
	},
	camera: {
		projectionMatrix: {
			value: new GLP.Matrix(),
			type: 'Matrix4fv'
		},
		viewMatrix: {
			value: new GLP.Matrix(),
			type: 'Matrix4fv'
		}
	},
	tex: {},
	audio: {},
};

/*-------------------------------
	DEBUG
-------------------------------*/

import { GPUState } from '../libs/GPUState';
export const gpuState: GPUState | undefined = undefined;

import 'webgl-memory';
import { BPM } from '../libs/BPM';
import { MPKMini } from '../libs/MPKMini';
import { LPD8 } from '../libs/LPD8';
// gpuState = new GPUState();
