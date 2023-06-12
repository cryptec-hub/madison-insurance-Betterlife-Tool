import AnimatedNumbers from "react-animated-numbers";

import React, { useEffect, useState } from "react";

export default function TotalValueComponent({
  inPatientAmount,
  outPatientAmount,
  dentalAmount,
  opticalAmount,
  maternityAmount,
}) {
  const [finalTotalValue, setFinalTotalValue] = useState(44500);
  useEffect(() => {
    async function fetchTotal() {
      const totalAmountFunction = (a, b, c, d, e) => {
        return a + b + c + d + e;
      };
      const totalValue = totalAmountFunction(
        inPatientAmount,
        outPatientAmount,
        dentalAmount,
        opticalAmount,
        maternityAmount
      );
      setFinalTotalValue(totalValue);
    }
    fetchTotal();
  }, [
    inPatientAmount,
    outPatientAmount,
    dentalAmount,
    opticalAmount,
    maternityAmount,
  ]);

  return (
    <div>
      <AnimatedNumbers
        includeComma
        animateToNumber={finalTotalValue}
        fontStyle={{ fontSize: 20 }}
        locale="en-US"
      ></AnimatedNumbers>
    </div>
  );
}
