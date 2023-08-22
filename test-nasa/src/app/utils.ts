import { AsteroidsNearEarthForPeriod, AsteroidInfo, NearEarthObjects, CardInfo } from './types';
import { estimateAsteroidImageSize } from './sizeEstimate';
import { monthMap } from './monthMap';

function splitDate(stringDate: string) {
  const parts = stringDate.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  console.log(parts)
  return {
    year: year,
    month: month,
    day: day
  }
};

function setDateForCardInfo(date: string) {
  const splittedDate = splitDate(date);
  return `${splittedDate.day} ${monthMap[splittedDate.month]} ${splittedDate.year}`
};

export function addToDate(startDate: string, period: number) {
  const splittedDate = splitDate(startDate);
  const dateObject = new Date(startDate);
  const newDate = new Date(dateObject.setDate(dateObject.getDate() + period));
  return newDate;
};

export function getYYYYMMDDFormat(dateObject: Date) {
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  return currentDate;
};

export function getInfoForCards(nearEarthObjects: NearEarthObjects) {
  const asteroidsInfoForPeriod: CardInfo[] = [];
  Object.keys(nearEarthObjects).forEach((date) => {
    nearEarthObjects[date].forEach((asteroidInfo: AsteroidInfo) => {
      const infoForCard: CardInfo = {
        name: asteroidInfo.name,
        dangerous: asteroidInfo.is_potentially_hazardous_asteroid,
        date: setDateForCardInfo(asteroidInfo.close_approach_data[0].close_approach_date),
        distanceToEarth: {
          kilometers: Math.ceil(+asteroidInfo.close_approach_data[0].miss_distance.kilometers),
          lunar: Math.ceil(+asteroidInfo.close_approach_data[0].miss_distance.lunar)
        },
        imgSize: estimateAsteroidImageSize(Math.ceil(asteroidInfo.estimated_diameter.meters.estimated_diameter_max)),
        size: Math.ceil(asteroidInfo.estimated_diameter.meters.estimated_diameter_max),
      };
      asteroidsInfoForPeriod.push(infoForCard);
    });
  });
  return asteroidsInfoForPeriod;
};