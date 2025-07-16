import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const getDiffDay = (date: string | number | Date) => {
  const diffS = dayjs().diff(dayjs(date), 's');
  const diffDayM = dayjs().diff(dayjs(date), 'm');
  const diffDayH = dayjs().diff(dayjs(date), 'h');
  const diffDayD = dayjs().diff(dayjs(date), 'd');
  let diffDay = '';
  if (diffDayD) {
    diffDay += `${diffDayD} days `;
  }
  if (diffDayH) {
    diffDay += `${diffDayH % 24} hrs `;
  }
  if (diffDayM) {
    diffDay += `${diffDayM % 60} mins `;
  }
  if (diffS) {
    diffDay += `${diffS % 60} secs ago`;
  } else {
    diffDay += `0 secs ago`;
  }

  return diffDay;
};

const getUtcFormat = (date: string | number | Date) => {
  const formatDate = dayjs(date).utc().format('MMM-DD-YYYY hh:mm:ss A +UTC');
  return formatDate;
};

export default { getDiffDay, getUtcFormat };
