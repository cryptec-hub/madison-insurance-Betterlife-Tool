import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import AnimatedNumbers from "react-animated-numbers";

function IntersectionValueComponent({ limitValue, colValue, sheetNumber }) {
  const [intersectionValue, setIntersectionValue] = useState(null);
  const key = `${limitValue}-${colValue}-${sheetNumber}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/MADISON-BETTERLIFE-SME-RATE-CARD.xlsx");
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

        const intersectionValue = getValueAtIntersection(limitValue, colValue);
        setIntersectionValue(intersectionValue || 0);
      } catch (error) {
        console.error("Error loading Excel file:", error.message);
        setIntersectionValue(null);
      }
    }

    fetchData();
  }, [limitValue, colValue, sheetNumber]);

  return (
    <div key={key}>
      <AnimatedNumbers
        includeComma
        animateToNumber={intersectionValue}
        fontStyle={{ fontSize: 20 }}
        locale="en-US"
      ></AnimatedNumbers>
    </div>
  );
}

export default React.memo(IntersectionValueComponent);
