import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

type DateType = number | string | Date | Dayjs;

/**
 * @param date - 需要被格式化的时间
 * @param fmt - 指定格式化形式，Y/M/D均大写，H/h（小写12小时制），m/s均小写，S（毫秒）大写，A（AM or PM)，x（时间戳ms）
 */
export function format(date: DateType, fmt: string): string {
  const d = dayjs(date);
  if (!d.isValid()) {
    return '';
  }

  return d.format(fmt);
}

export function formatDateTime(date: DateType, plusMs: boolean = false) {
  const fmtStr = 'YYYY-MM-DD HH:mm:ss' + (plusMs ? ':SSS' : '');
  return format(date, fmtStr);
}

/**
 * date1 是否在 date2 之前
 */
export function isBeforeDay(date1: DateType, date2: DateType) {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  if (!(d1.isValid() && d2.isValid())) {
    throw new Error('please input valid date');
  }

  return d1.isBefore(d2, 'day');
}

export function isBeforeToday(date: DateType) {
  const d1 = dayjs(date);
  const d2 = dayjs(new Date());
  if (!(d1.isValid() && d2.isValid())) {
    throw new Error('please input valid date');
  }

  return isBeforeDay(d1, d2);
}

/**
 * date1 是否在 date2 之后
 */
export function isAfterDay(date1: DateType, date2: DateType) {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  if (!(d1.isValid() && d2.isValid())) {
    throw new Error('please input valid date');
  }

  return d1.isAfter(d2, 'day');
}

export function isAfterToday(date: DateType) {
  const d1 = dayjs(date);
  const d2 = dayjs(new Date());
  if (!(d1.isValid() && d2.isValid())) {
    throw new Error('please input valid date');
  }

  return isAfterDay(d1, d2);
}