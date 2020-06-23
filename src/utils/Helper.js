// eslint-disable-next-line import/prefer-default-export
import moment from 'moment';
// import slugify from 'slugify';

export function generateRandStr(length, type = 'mix') {
  let characters;
  if (type === 'mix') {
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  } else if (type === 'numeric') {
    characters = '0123456789';
  }
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// export function generateSlug(string) {
//   return slugify(`${string}-${generateRandStr(5)}`, {
//     lower: true,
//     strict: true
//   });
// }

export function naturalOrderBy(a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
}

export function getStatisticalTimeRange() {
  const thisMonth = moment();
  const tmMonth = thisMonth.format('M');
  const tmYear = thisMonth.format('YYYY');

  const lastMonth = thisMonth.add(-1, 'months');
  const lmMonth = lastMonth.format('M');
  const lmYear = lastMonth.format('YYYY');

  return {
    tmMonth,
    tmYear,
    lmMonth,
    lmYear
  };
}

export function calculateGrowth(thisMonthGrowth, lastMonthGrowth) {
  let percent;
  if (lastMonthGrowth === 0) {
    percent = 1;
  } else if (thisMonthGrowth === 0) {
    percent = -1;
  } else {
    percent = thisMonthGrowth / lastMonthGrowth - 1;
  }
  return percent * 100;
}
