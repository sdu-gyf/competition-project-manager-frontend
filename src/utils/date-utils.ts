import moment, { Moment } from 'moment';
export const DATE_FORMAT_DAY_WITHOUT_HYPHEN = 'YYYYMMDD';
export const DATE_FORMAT_DAY_WITH_HYPHEN = 'YYYY-MM-DD';
export const DATE_FORMAT_WITH_SECONDS = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_MONTH_CN = 'YYYY年MM月';
export const DATE_FORMAT_MONTH_WITH_HYPHEN = 'YYYY-MM';
export const DATE_FORMAT_DAY_CN = 'YYYY年MM月DD日';

export const formatDate = (date: number | string | Moment | undefined, format?: string) => {
  if (date) {
    return moment(date).format(format || DATE_FORMAT_DAY_WITH_HYPHEN);
  }
  return '';
};
