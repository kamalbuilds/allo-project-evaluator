import { EPoolStatus } from "@/types/types";

export const getStrategyTypeFromStrategyName = (
    strategyName: string,
): string => {
    if (strategyName === "allov2.MicroGrantsStrategy") return "Manual";
    if (strategyName === "allov2.MicroGrantsGovStrategy") return "Governance";
    if (strategyName === "allov2.MicroGrantsHatsStrategy") return "Hats";

    return "Custom Strategy";
};

export const statusColors = {
    Accepted: "text-green-700 bg-green-50 ring-green-600-20",
    Active: "text-green-700 bg-green-50 ring-green-600-20",

    Upcoming: "text-blue-700 bg-blue-50 ring-blue-600-20",
    Paid: "text-blue-700 bg-blue-50 ring-blue-600-20",

    Pending: "text-yellow-600 bg-yellow-50 ring-yellow-600-20",
    Rejected: "text-red-700 bg-red-50 ring-red-600/10",

    Ended: "text-gray-600 bg-gray-50 ring-gray-500-10",
    Undefined: "text-gray-600 bg-gray-50 ring-gray-500-10",
};

export enum Status {
    None = 0,
    Pending = 1,
    Accepted = 2,
    Rejected = 3,
    Appealed = 4,
    InReview = 5,
    Canceled = 6
}


export const getPoolStatus = (
    startDate: number,
    endDate: number,
): EPoolStatus => {
    const now = new Date().getTime() / 1000;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (now < start) {
        return EPoolStatus.UPCOMING;
    } else if (now > end) {
        return EPoolStatus.ENDED;
    } else {
        return EPoolStatus.ACTIVE;
    }
};