/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Utility JS Edition
 * @website https://www.dynamsoft.com
 * @copyright Copyright 2024, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 1.0.21
 * @fileoverview Dynamsoft JavaScript Library for Core
 * More info DU JS: https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/utility/utility-module.html
 */
import{EnumImagePixelFormat as e,EnumCapturedResultItemType as t}from"dynamsoft-core";class i{async saveToFile(e,t,i){if(!e||!t)return null;if("string"!=typeof t)throw new TypeError("FileName must be of type string.");const l=s(e);return r(l,t,i)}async toCanvas(e){const t=s(e);return l(t)}}const r=async(e,t,i)=>await new Promise((async(r,l)=>{try{const l=t.split(".");let s=l[l.length-1];const a=await n(`image/${s}`,e);l.length<=1&&(s="png");const o=new File([a],t,{type:`image/${s}`});if(i){const e=URL.createObjectURL(o),i=document.createElement("a");i.href=e,i.download=t,i.click()}return r(o)}catch(e){return l()}})),l=e=>{const t=document.createElement("canvas");t.width=e.width,t.height=e.height;return t.getContext("2d",{willReadFrequently:!0}).putImageData(e,0,0),t},n=async(e,t)=>{const i=l(t);return new Promise(((t,r)=>{i.toBlob((e=>t(e)),e)}))},s=t=>{let i,r=t.bytes;if(!(r&&r instanceof Uint8Array))throw Error("Parameter type error");if(Number(t.format)===e.IPF_BGR_888){const e=r.length/3;i=new Uint8ClampedArray(4*e);for(let t=0;t<e;++t)i[4*t]=r[3*t],i[4*t+1]=r[3*t+1],i[4*t+2]=r[3*t+2],i[4*t+3]=255}else if(Number(t.format)===e.IPF_RGB_888){const e=r.length/3;i=new Uint8ClampedArray(4*e);for(let t=0;t<e;++t)i[4*t]=r[3*t+2],i[4*t+1]=r[3*t+1],i[4*t+2]=r[3*t],i[4*t+3]=255}else if(Number(t.format)===e.IPF_GRAYSCALED){const e=r.length;i=new Uint8ClampedArray(4*e);for(let t=0;t<e;t++)i[4*t]=i[4*t+1]=i[4*t+2]=r[t],i[4*t+3]=255}else if(Number(t.format)===e.IPF_BINARY_8){const e=r.length,l=t.width,n=t.height,s=t.stride;i=new Uint8ClampedArray(l*n*4);for(let t=0;t<e;t++){let e=r[t],n=t%s,a=Math.floor(t/s);for(let t=0;t<8;t++){let r=n+t,s=4*(a*l+r);if(r>=l)break;i[s]=i[s+1]=i[s+2]=(128&e)/128*255,i[s+3]=255,e<<=1}}}else if(Number(t.format)===e.IPF_ABGR_8888){const e=r.length/4;i=new Uint8ClampedArray(r.length);for(let t=0;t<e;++t)i[4*t]=r[4*t],i[4*t+1]=r[4*t+1],i[4*t+2]=r[4*t+2],i[4*t+3]=r[4*t+3]}else if(Number(t.format)===e.IPF_ARGB_8888){const e=r.length/4;i=new Uint8ClampedArray(r.length);for(let t=0;t<e;++t)i[4*t]=r[4*t],i[4*t+1]=r[4*t+1],i[4*t+2]=r[4*t+2],i[4*t+3]=r[4*t+3]}return new ImageData(i,t.width,t.height)};class a{static getVersion(){return"1.0.21(Worker: No Worker, Wasm: No Wasm)"}}class o{constructor(){this.verificationEnabled={[t.CRIT_BARCODE]:!1,[t.CRIT_TEXT_LINE]:!0,[t.CRIT_DETECTED_QUAD]:!0,[t.CRIT_NORMALIZED_IMAGE]:!1},this.duplicateFilterEnabled={[t.CRIT_BARCODE]:!1,[t.CRIT_TEXT_LINE]:!1,[t.CRIT_DETECTED_QUAD]:!1,[t.CRIT_NORMALIZED_IMAGE]:!1},this.duplicateForgetTime={[t.CRIT_BARCODE]:3e3,[t.CRIT_TEXT_LINE]:3e3,[t.CRIT_DETECTED_QUAD]:3e3,[t.CRIT_NORMALIZED_IMAGE]:3e3},this._allowType=[2,4,8,16]}enableResultCrossVerification(e,t){this._allowType.includes(e)&&(this.verificationEnabled[e]=t)}isResultCrossVerificationEnabled(e){return this.verificationEnabled[e]}enableResultDeduplication(e,t){this._allowType.includes(e)&&(this.duplicateFilterEnabled[e]=t)}isResultDeduplicationEnabled(e){return this.duplicateFilterEnabled[e]}setDuplicateForgetTime(e,t){t>18e4&&(t=18e4),t<0&&(t=0),this.duplicateForgetTime[e]=t}getDuplicateForgetTime(e){return this.duplicateForgetTime[e]}getFilteredResultItemTypes(){let e=0;const i=[t.CRIT_BARCODE,t.CRIT_TEXT_LINE,t.CRIT_DETECTED_QUAD];for(let t=0;t<i.length;t++)(this.verificationEnabled[i[t]]||this.duplicateFilterEnabled[i[t]])&&(e|=i[t]);return e}onDecodedBarcodesReceived(e){if(this.isResultCrossVerificationEnabled(t.CRIT_BARCODE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_BARCODE&&!e[i].verified&&(e[i].isFilter=!0);if(this.isResultDeduplicationEnabled(t.CRIT_BARCODE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_BARCODE&&e[i].duplicate&&(e[i].isFilter=!0)}onRecognizedTextLinesReceived(e){if(this.isResultCrossVerificationEnabled(t.CRIT_TEXT_LINE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_TEXT_LINE&&!e[i].verified&&(e[i].isFilter=!0);if(this.isResultDeduplicationEnabled(t.CRIT_TEXT_LINE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_TEXT_LINE&&e[i].duplicate&&(e[i].isFilter=!0)}onDetectedQuadsReceived(e){if(this.isResultCrossVerificationEnabled(t.CRIT_DETECTED_QUAD))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_DETECTED_QUAD&&!e[i].verified&&(e[i].isFilter=!0);if(this.isResultDeduplicationEnabled(t.CRIT_DETECTED_QUAD))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_DETECTED_QUAD&&e[i].duplicate&&(e[i].isFilter=!0)}onNormalizedImagesReceived(e){if(this.isResultCrossVerificationEnabled(t.CRIT_NORMALIZED_IMAGE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_NORMALIZED_IMAGE&&!e[i].verified&&(e[i].isFilter=!0);if(this.isResultDeduplicationEnabled(t.CRIT_NORMALIZED_IMAGE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.CRIT_NORMALIZED_IMAGE&&e[i].duplicate&&(e[i].isFilter=!0)}}export{i as ImageManager,o as MultiFrameResultCrossFilter,a as UtilityModule};
