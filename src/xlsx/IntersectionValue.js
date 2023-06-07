import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function IntersectionValueComponent({ limitValue, colValue }) {
  const [intersectionValue, setIntersectionValue] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/MADISON-BETTERLIFE-SME-RATE-CARD.xlsx");
        if (response.status === 404) throw new Error("404 File Not Found");

        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "buffer" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

        // Filter out empty rows or rows with undefined values
        const filteredData = jsonData.filter((row) => {
          return Object.values(row).some(
            (value) => value !== undefined && value !== ""
          );
        });

        // console.log(filteredData);

        const getValueAtIntersection = (limitValue, colValue) => {
          if (!Array.isArray(filteredData)) return null;

          // Find the object that contains the specified limitValue
          const rowObject = filteredData.find(
            (row) => row.Limit === limitValue
          );

          if (!rowObject) return null;

          // Check if the intersection property exists for the specified colValue
          const numberOfMembersValue = rowObject[colValue];
          if (
            numberOfMembersValue === undefined ||
            numberOfMembersValue === null
          )
            return null;

          return numberOfMembersValue;
        };

        const intersectionValue = getValueAtIntersection(limitValue, colValue);
        setIntersectionValue(intersectionValue);
      } catch (error) {
        console.error("Error loading Excel file:", error.message);
        setIntersectionValue(null);
      }
    }

    fetchData();
  }, [limitValue, colValue]);

  return (
    <div>
      <h2>Intersection Value</h2>
      <p>Limit Value: {limitValue}</p>
      <p>Column Value: {colValue}</p>
      <p>Intersection Value: {intersectionValue}</p>
    </div>
  );
}

export default IntersectionValueComponent;
