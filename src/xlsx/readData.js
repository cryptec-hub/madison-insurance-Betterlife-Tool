import readXlsxFile from "read-excel-file";

export async function getRowAndColumn(filePath, sheetName, targetValue) {
  try {
    const rows = await readXlsxFile("../xlsx/file_example_XLSX_50.xlsx");

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cellValue = row[colIndex];

        if (cellValue === targetValue) {
          const rowNumber = rowIndex + 1;
          const columnNumber = colIndex + 1;
          console.log(
            `Found value "${targetValue}" at Row ${rowNumber}, Column ${columnNumber}`
          );
          return { row: rowNumber, column: columnNumber };
        }
      }
    }

    console.log(`Value "${targetValue}" not found in the specified sheet.`);
    return null;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return null;
  }
}
