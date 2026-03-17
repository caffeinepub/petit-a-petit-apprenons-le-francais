import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Achievement {
    studentName: string;
    year: bigint;
    score: bigint;
    grade: bigint;
    board: Board;
}
export interface Resource {
    title: string;
    blob: ExternalBlob;
    description: string;
    fileType: FileType;
    uploadedAt: bigint;
}
export interface UserProfile {
    name: string;
}
export interface Review {
    starRating: bigint;
    studentName: string;
    year: bigint;
    reviewText: string;
}
export enum Board {
    CBSE = "CBSE",
    IGCSE = "IGCSE"
}
export enum FileType {
    doc = "doc",
    pdf = "pdf",
    video = "video",
    image = "image"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(review: Review): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteResource(id: bigint): Promise<void>;
    getAchievements(): Promise<Array<Achievement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getResourceById(id: bigint): Promise<Resource | null>;
    getResources(): Promise<Array<Resource>>;
    getReviews(): Promise<Array<Review>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    uploadResource(title: string, description: string, blob: ExternalBlob, fileType: FileType): Promise<void>;
}
