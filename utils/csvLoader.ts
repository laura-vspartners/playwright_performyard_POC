import * as fs from 'fs';
import * as path from 'path';

export function loadCSV(filePath: string): Array<Record<string, string>> {
  const csvPath = path.resolve(__dirname, filePath);
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  // Split the content into rows and columns
  const [headerLine, ...lines] = csvContent.split('\n').filter(Boolean);
  const headers = headerLine.split(',');

  // Convert rows into objects using headers
  return lines.map((line) => {
    const values = line.split(',');
    return headers.reduce((record, header, index) => {
      record[header] = values[index] || '';
      return record;
    }, {} as Record<string, string>);
  });
}
