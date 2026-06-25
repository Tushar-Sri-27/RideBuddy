const calculateImpact = (
  distanceKm,
  passengerCount
) => {
  const fuelSaved =
    distanceKm * passengerCount * 0.08;

  const co2Reduced =
    fuelSaved * 2.31;

  const moneySaved =
    fuelSaved * 110;

  return {
    fuelSaved: Number(
      fuelSaved.toFixed(2)
    ),

    co2Reduced: Number(
      co2Reduced.toFixed(2)
    ),

    moneySaved: Number(
      moneySaved.toFixed(2)
    ),
  };
};

module.exports = calculateImpact;