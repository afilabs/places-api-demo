export const formatSnakeCase = (input) => {
  return input
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.toLowerCase();
      }
    })
    .join(' ');
};

export const getAvailablePlaceTypeOptions = (allResults, placeTypeOptions) => {
  const uniqueTypes = [...new Set(allResults.map((result) => result.type))];
  return placeTypeOptions.filter((option) => uniqueTypes.includes(option.value));
};
