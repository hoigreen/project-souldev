import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow, isToday } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';
import { Locale } from './definitions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${time} - ${formattedDate}`;
}

// created by chatgpt
export function formatThreadCount(count: number): string {
  if (count === 0) {
    return 'No Threads';
  } else {
    const threadCount = count.toString().padStart(2, '0');
    const threadWord = count === 1 ? 'Thread' : 'Threads';
    return `${threadCount} ${threadWord}`;
  }
}

export const translateConstant = (t: any, message: string | undefined) => {
  if (!message?.startsWith('T_')) {
    return message;
  } else {
    return t(message);
  }
};

export function getFullName(
  firstName?: string | null,
  lastName?: string | null,
) {
  return [firstName, lastName].filter(Boolean).join(' ');
}

export const checkUndefined = (data: any): boolean => {
  return data === 'undefined' || data.length === 0;
};

export function isFutureDate(date: string): boolean {
  // Date is in ISO 8601 format
  const currentDate = new Date();
  const inputDate = new Date(date);

  return inputDate > currentDate;
}

export const calculateTime = (datetime: string, locale?: Locale) => {
  const date = new Date(datetime);
  const localeString = locale || 'en';

  if (isToday(date)) {
    const localeObj = localeString === 'vi' ? vi : enUS;

    return formatDistanceToNow(date, { addSuffix: true, locale: localeObj });
  }

  return format(date, 'HH:mm dd/LL');
};

export const getRelativeUnixDays = (
  startUnixTime?: number,
  endUnixTime?: number,
) => {
  if (!startUnixTime || !endUnixTime) {
    return 0;
  }

  const timeDiff = endUnixTime - startUnixTime;

  return Math.floor(timeDiff / (1000 * 3600 * 24));
};
