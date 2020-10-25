
/**
 * Iterate the object and call comparator function to reduce a single value
 * @param {Object} data refers to accountData object with player id as key and player data as value
 * @param {Function} comparator function that compares two data and returns one.
 */
const iterator = (data, comparator) => {
    return Object.values(data).reduce(
        (storedValue, currentValue) => comparator(storedValue, currentValue),
        undefined
    ).name;
 };

 
/**
 * Function returns the player data with smallest createdAt 
 * @param {Object} data refers to accountData object with player id as key and player data as value.
 * @return {Object} player data object with smallest createdAt
 */
const smallestCreatedAt = (data) => {
  return iterator(data, (value1, value2) =>
    Number.parseInt(value1?.createdAt, 10) <
    Number.parseInt(value2?.createdAt, 10)
      ? value1
      : value2
  );
};

/**
 * Function returns the player data with  largest createdAt 
 * @param {Object} data refers to accountData object with player id as key and player data as value.
 * @return {Object} player data object with largest createdAt
 */
const largestCreatedAt = (data) => {
    return iterator(data, (value1, value2) =>
    Number.parseInt(value1?.createdAt, 10) >
    Number.parseInt(value2?.createdAt, 10)
      ? value1
      : value2
  );
};


// Answer to 1
largestCreatedAt(accountData);

// Answer to 2
smallestCreatedAt(accountData);

// Answer to 3 
Object.values(accountData).sort(
    (d1, d2) =>
      Number.parseInt(d1.createdAt, 10) - Number.parseInt(d2.createdAt, 10)
  )
