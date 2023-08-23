import { CapturedResultFilter, EnumCapturedResultItemType, OriginalImageResultItem } from "dynamsoft-core";
export default class MultiFrameResultCrossFilter implements CapturedResultFilter {
    verificationEnabled: any;
    duplicateFilterEnabled: any;
    duplicateForgetTime: any;
    private _allowType;
    enableResultCrossVerification(resultItemTypes: EnumCapturedResultItemType, enabled: boolean): void;
    isResultCrossVerificationEnabled(type: EnumCapturedResultItemType): boolean;
    enableResultDeduplication(resultItemTypes: EnumCapturedResultItemType, enabled: boolean): void;
    isResultDeduplicationEnabled(type: EnumCapturedResultItemType): boolean;
    setDuplicateForgetTime(resultItemTypes: EnumCapturedResultItemType, time: number): void;
    getDuplicateForgetTime(type: EnumCapturedResultItemType): number;
    getFilteredResultItemTypes(): number;
    onOriginalImageResultReceived: (result: OriginalImageResultItem) => void;
    onDetectedQuadsReceived(result: any): void;
    onNormalizedImagesReceived(result: any): void;
}
//# sourceMappingURL=multiframeresultcrossfilter.d.ts.map