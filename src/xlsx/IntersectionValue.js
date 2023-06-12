import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import AnimatedNumbers from "react-animated-numbers";
import { isEqual } from "lodash";

function IntersectionValueComponent({
  limitValue,
  colValue,
  sheetNumber,
  onIntersectionValueChange,
  uniqueId, // Unique identifier for each instance
}) {
  const getInitialIntersectionValue = (sheetNumber) => {
    switch (sheetNumber) {
      case 0:
        return 44500; // Initial value for sheetNumber 0
      case 1:
        return 53400;
      default:
        return 0; // Default initial value if sheetNumber doesn't match any case
    }
  };

  const [intersectionValue, setIntersectionValue] = useState(
    getInitialIntersectionValue(sheetNumber)
  );
  const prevLimitValueRef = useRef(limitValue);
  const prevColValueRef = useRef(colValue);
  const prevSheetNumberRef = useRef(sheetNumber);
  const prevUniqueIdRef = useRef(uniqueId);

  useEffect(() => {
    if (
      limitValue !== prevLimitValueRef.current ||
      colValue !== prevColValueRef.current ||
      sheetNumber !== prevSheetNumberRef.current ||
      uniqueId !== prevUniqueIdRef.current
    ) {
      prevLimitValueRef.current = limitValue;
      prevColValueRef.current = colValue;
      prevSheetNumberRef.current = sheetNumber;
      prevUniqueIdRef.current = uniqueId;

      async function fetchData() {
        try {
          const response = await fetch(
            "/MADISON-BETTERLIFE-SME-RATE-CARD.xlsx"
          );
          if (response.status === 404) throw new Error("404 File Not Found");

          const buffer = await response.arrayBuffer();
          const workbook = XLSX.read(buffer, { type: "buffer" });

          const sheetName = workbook.SheetNames[sheetNumber];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

          const filteredData = jsonData.filter((row) =>
            Object.values(row).some(
              (value) => value !== undefined && value !== ""
            )
          );

          const getValueAtIntersection = (limitValue, colValue) => {
            if (!Array.isArray(filteredData)) return null;

            const rowObject = filteredData.find(
              (row) => row.Limit === limitValue
            );
            if (!rowObject) return null;

            const numberOfMembersValue = rowObject[colValue];
            if (
              numberOfMembersValue === undefined ||
              numberOfMembersValue === null
            )
              return null;

            return numberOfMembersValue;
          };

          const intersectionValue = Math.round(
            getValueAtIntersection(limitValue, colValue)
          );
          setIntersectionValue(intersectionValue || 0);
          onIntersectionValueChange(intersectionValue || 0, uniqueId); // Pass the intersection value and unique identifier to the parent component
        } catch (error) {
          console.error("Error loading Excel file:", error.message);
          setIntersectionValue(null);
          onIntersectionValueChange(null, uniqueId); // Pass null and unique identifier to the parent component in case of an error
        }
      }

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitValue, colValue, sheetNumber, uniqueId]); // Only re-run the effect when these specific dependencies change

  return (
    <AnimatedNumbers
      includeComma
      animateToNumber={intersectionValue}
      fontStyle={{ fontSize: 20 }}
      locale="en-US"
    ></AnimatedNumbers>
  );
}

const arePropsEqual = (prevProps, nextProps) => {
  const {
    limitValue: prevLimitValue,
    colValue: prevColValue,
    sheetNumber: prevSheetNumber,
  } = prevProps;
  const {
    limitValue: nextLimitValue,
    colValue: nextColValue,
    sheetNumber: nextSheetNumber,
  } = nextProps;

  return isEqual(
    [prevLimitValue, prevColValue, prevSheetNumber],
    [nextLimitValue, nextColValue, nextSheetNumber]
  );
};

export default React.memo(IntersectionValueComponent, arePropsEqual);
