import { DSImageData } from "dynamsoft-core";
export default class ImageManager {
    /**
     * This method saves an image in either PNG or JPG format. The desired file format is inferred from the file extension provided in the 'name' parameter. Should the specified file format be omitted or unsupported, the data will default to being exported in PNG format.
     *
     * @param image The image to be saved, of type `DSImageData`.
     * @param name The name of the file, as a string, under which the image will be saved.
     * @param download An optional boolean flag that, when set to true, triggers the download of the file.
     *
     * @returns A promise that resolves with the saved File object.
     */
    saveToFile(image: DSImageData, name: string, download?: boolean): Promise<File>;
}
