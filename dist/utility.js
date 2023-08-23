/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Utility JS Edition
 * @website https://www.dynamsoft.com
 * @copyright Copyright 2023, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 1.0.10
 * @fileoverview Dynamsoft JavaScript Library for Core
 * More info DU JS: https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/utility/utility-module.html
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("dynamsoft-core")):"function"==typeof define&&define.amd?define(["exports","dynamsoft-core"],t):t(((e="undefined"!=typeof globalThis?globalThis:e||self).Dynamsoft=e.Dynamsoft||{},e.Dynamsoft.Utility={}),e.Dynamsoft.Core)}(this,(function(e,t){"use strict";e.ImageManager=class{async saveToFile(e,t,i){if(!e||!t)return null;if("string"!=typeof t)throw new TypeError("FileName must be of type string.");const l=this._getNorImageData(e);return this._saveToFile(l,t,i)}async _saveToFile(e,t,i){return await new Promise((async(l,n)=>{try{const n=t.split(".");let r=n[n.length-1];const a=await this._toBlob(`image/${r}`,e);n.length<=1&&(r="png");const s=new File([a],t,{type:`image/${r}`});if(i){const e=URL.createObjectURL(s),i=document.createElement("a");i.href=e,i.download=t,i.click()}return l(s)}catch(e){return n()}}))}_getNorImageData(e){let i,l=e.bytes;if(!(l&&l instanceof Uint8Array))throw Error("Parameter type error");if(e.format===t.EnumImagePixelFormat.IPF_BGR_888){const e=l.length/3;i=new Uint8ClampedArray(4*e);for(let t=0;t<e;++t)i[4*t]=l[3*t],i[4*t+1]=l[3*t+1],i[4*t+2]=l[3*t+2],i[4*t+3]=255}else if(e.format===t.EnumImagePixelFormat.IPF_RGB_888){const e=l.length/3;i=new Uint8ClampedArray(4*e);for(let t=0;t<e;++t)i[4*t]=l[3*t+2],i[4*t+1]=l[3*t+1],i[4*t+2]=l[3*t],i[4*t+3]=255}else if(e.format===t.EnumImagePixelFormat.IPF_GRAYSCALED){const e=l.length;i=new Uint8ClampedArray(4*e);for(let t=0;t<e;t++)i[4*t]=i[4*t+1]=i[4*t+2]=l[t],i[4*t+3]=255}else if(e.format===t.EnumImagePixelFormat.IPF_BINARY_8){const t=l.length,n=e.width,r=e.height,a=e.stride;i=new Uint8ClampedArray(n*r*4);for(let e=0;e<t;e++){let t=l[e],r=e%a,s=Math.floor(e/a);for(let e=0;e<8;e++){let l=r+e,a=4*(s*n+l);if(l>=n)break;i[a]=i[a+1]=i[a+2]=(128&t)/128*255,i[a+3]=255,t<<=1}}}else if(e.format===t.EnumImagePixelFormat.IPF_ABGR_8888){const e=l.length/4;i=new Uint8ClampedArray(l.length);for(let t=0;t<e;++t)i[4*t]=l[4*t],i[4*t+1]=l[4*t+1],i[4*t+2]=l[4*t+2],i[4*t+3]=l[4*t+3]}else if(e.format===t.EnumImagePixelFormat.IPF_ARGB_8888){const e=l.length/4;i=new Uint8ClampedArray(l.length);for(let t=0;t<e;++t)i[4*t]=l[4*t],i[4*t+1]=l[4*t+1],i[4*t+2]=l[4*t+2],i[4*t+3]=l[4*t+3]}return new ImageData(i,e.width,e.height)}_toCanvas(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;return t.getContext("2d",{willReadFrequently:!0}).putImageData(e,0,0),t}async _toBlob(e,t){const i=this._toCanvas(t);return new Promise(((t,l)=>{i.toBlob((e=>t(e)),e)}))}},e.MultiFrameResultCrossFilter=class{constructor(){this.verificationEnabled={[t.EnumCapturedResultItemType.CRIT_BARCODE]:!1,[t.EnumCapturedResultItemType.CRIT_TEXT_LINE]:!0,[t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD]:!0,[t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE]:!1},this.duplicateFilterEnabled={[t.EnumCapturedResultItemType.CRIT_BARCODE]:!1,[t.EnumCapturedResultItemType.CRIT_TEXT_LINE]:!1,[t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD]:!1,[t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE]:!1},this.duplicateForgetTime={[t.EnumCapturedResultItemType.CRIT_BARCODE]:3e3,[t.EnumCapturedResultItemType.CRIT_TEXT_LINE]:3e3,[t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD]:3e3,[t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE]:3e3},this._allowType=[2,4,8,16]}enableResultCrossVerification(e,t){this._allowType.includes(e)&&(this.verificationEnabled[e]=t)}isResultCrossVerificationEnabled(e){return this.verificationEnabled[e]}enableResultDeduplication(e,t){this._allowType.includes(e)&&(this.duplicateFilterEnabled[e]=t)}isResultDeduplicationEnabled(e){return this.duplicateFilterEnabled[e]}setDuplicateForgetTime(e,t){this.duplicateForgetTime[e]=t}getDuplicateForgetTime(e){return this.duplicateForgetTime[e]}getFilteredResultItemTypes(){let e=0;const i=[t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD];for(let t=0;t<i.length;t++)(this.verificationEnabled[i[t]]||this.duplicateFilterEnabled[i[t]])&&(e|=i[t]);return e}onDetectedQuadsReceived(e){if(this.isResultCrossVerificationEnabled(t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD&&!e[i].verify&&(e[i].isFilter=!0);if(this.isResultDeduplicationEnabled(t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.EnumCapturedResultItemType.CRIT_DETECTED_QUAD&&e[i].duplicate&&(e[i].isFilter=!0)}onNormalizedImagesReceived(e){if(this.isResultCrossVerificationEnabled(t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE&&!e[i].verify&&(e[i].isFilter=!0);if(this.isResultDeduplicationEnabled(t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE))for(let i=0;i<e.length;i++)e[i]&&e[i].type===t.EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE&&e[i].duplicate&&(e[i].isFilter=!0)}},e.UtilityModule=class{static getVersion(){return"1.0.10"}},Object.defineProperty(e,"__esModule",{value:!0})}));
