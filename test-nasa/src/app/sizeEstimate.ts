const asteroidImageSizeCoef = {
  small: 0.7,
  medium: 0.9,
  big: 1,
};

const biggestValueForSmallAsteroid = 99;
const biggestValueForMediumAsteroid = 599;

export function estimateAsteroidImageSize(size: number) {
  if (size > 0 && size <= biggestValueForSmallAsteroid) {
    return asteroidImageSizeCoef.small;
  } else if (size > biggestValueForSmallAsteroid && size <= biggestValueForMediumAsteroid) {
    return asteroidImageSizeCoef.medium;
  } else {
    return asteroidImageSizeCoef.big;
  }
};