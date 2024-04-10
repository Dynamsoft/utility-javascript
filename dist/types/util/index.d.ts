import { DSImageData } from "dynamsoft-core";
type mimetype = "image/png" | "image/jpeg";
declare const _saveToFile: (imageData: ImageData, name: string, download?: boolean) => Promise<File>;
declare const _toCanvas: (retImageData: ImageData) => HTMLCanvasElement;
declare const _toImage: (MIMEType: mimetype, retImageData: ImageData) => HTMLImageElement;
declare const _toBlob: (MIMEType: mimetype, retImageData: ImageData) => Promise<Blob>;
declare const _getNorImageData: (dsImageData: DSImageData) => ImageData;
export { _saveToFile, _toCanvas, _toImage, _toBlob, _getNorImageData };
