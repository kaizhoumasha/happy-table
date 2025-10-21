export declare function toLower(v: any): string;
export declare function parseNumber(v: any): number | null;
export declare function parseDateTime(v: any): number | null;
export declare function parseClockTime(v: any): number | null;
export declare function parseDuration(v: any): number | null;
export interface TypeAwareEquality {
    equals(candidate: any): boolean;
    notEquals(candidate: any): boolean;
}
export declare function createTypeAwareEquality(value: any): TypeAwareEquality;
