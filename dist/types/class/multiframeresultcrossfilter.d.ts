import { EnumCapturedResultItemType, OriginalImageResultItem } from "dynamsoft-core";
type resultItemTypesString = "barcode" | "text_line" | "detected_quad" | "normalized_image";
interface CapturedResultFilter {
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    onDecodedBarcodesReceived?: (result: any) => void;
    onRecognizedTextLinesReceived?: (result: any) => void;
    onDetectedQuadsReceived?: (result: any) => void;
    onNormalizedImagesReceived?: (result: any) => void;
    onParsedResultsReceived?: (result: any) => void;
}
export default class MultiFrameResultCrossFilter implements CapturedResultFilter {
    verificationEnabled: {
        [key: number]: boolean;
    };
    duplicateFilterEnabled: {
        [key: number]: boolean;
    };
    duplicateForgetTime: {
        [key: number]: number;
    };
    /**
     * Enables or disables the verification of one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle verification on or off.
     */
    enableResultCrossVerification(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if verification is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns Boolean indicating the status of verification for the specified type.
     */
    isResultCrossVerificationEnabled(type: EnumCapturedResultItemType | resultItemTypesString): boolean;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableResultDeduplication(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isResultDeduplicationEnabled(type: EnumCapturedResultItemType | resultItemTypesString): boolean;
    /**
     * Sets the interval during which duplicates are disregarded for specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param time Time in milliseconds during which duplicates are disregarded.
     */
    setDuplicateForgetTime(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, time: number): void;
    /**
     * Retrieves the interval during which duplicates are disregarded for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns The set interval for the specified item type.
     */
    getDuplicateForgetTime(type: EnumCapturedResultItemType | resultItemTypesString): number;
    getFilteredResultItemTypes(): number;
    onOriginalImageResultReceived(result: OriginalImageResultItem): void;
    onDecodedBarcodesReceived(result: any): void;
    onRecognizedTextLinesReceived(result: any): void;
    onDetectedQuadsReceived(result: any): void;
    onNormalizedImagesReceived(result: any): void;
}
export {};
