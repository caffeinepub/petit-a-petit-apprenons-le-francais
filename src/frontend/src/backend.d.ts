import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Review {
    starRating: bigint;
    year: bigint;
    reviewText: string;
    reviewerName: string;
    grade: bigint;
}
export interface Achievement {
    studentName: string;
    subject: string;
    year: bigint;
    score: bigint;
    grade: bigint;
}
export interface backendInterface {
    addAchievement(achievement: Achievement): Promise<void>;
    addReview(review: Review): Promise<void>;
    getAchievements(): Promise<Array<Achievement>>;
    getReviews(): Promise<Array<Review>>;
}
