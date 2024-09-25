/* eslint-disable no-unused-vars */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(createdAt: Date) {
  const date = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  let createdAtValue = diffMinutes;
  let dateFormat = "minute";

  if (diffYears >= 1) {
    createdAtValue = diffYears;
    dateFormat = "year";
  } else if (diffMonths >= 1) {
    createdAtValue = diffMonths;
    dateFormat = "month";
  } else if (diffWeeks >= 1) {
    createdAtValue = diffWeeks;
    dateFormat = "week";
  } else if (diffDays >= 1) {
    createdAtValue = diffDays;
    dateFormat = "day";
  } else if (diffHours >= 1) {
    createdAtValue = diffHours;
    dateFormat = "hour";
  }

  return { createdAtValue, dateFormat };
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"; // Billion
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Million
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"; // Thousand
  } else {
    return num.toString(); // Less than a thousand
  }
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}
export function assignBadges(params: BadgeParams) {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts;
}
