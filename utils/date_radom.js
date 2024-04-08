function getRandomDate() {
  const currentDate = new Date();

  const randomMilliseconds = Math.floor(Math.random() * 182 * 24 * 60 * 60 * 1000);

  const randomDate = new Date(currentDate - randomMilliseconds);

  return randomDate;
}

module.exports = getRandomDate;
