export const roundToTwoDecimals = (number: number) => {
  // Mengonversi string menjadi angka untuk menghindari pembulatan yang tidak diharapkan
  const parsedNumber = parseFloat(number.toString());
  // Menggunakan toFixed() untuk membulatkan angka menjadi dua desimal
  const roundedNumber = parsedNumber.toFixed(2);
  // Mengonversi kembali string menjadi angka
  return parseFloat(roundedNumber);
};

type typeData = 'B' | 'KB' | 'MB' | 'GB';
type SizeData = {
  value: number;
  unit: typeData;
};

export const convertSize = (size: SizeData, toUnit: typeData) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  const fromIndex = units.indexOf(size.unit);
  const toIndex = units.indexOf(toUnit);

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Invalid unit provided.');
  }

  const bytes = size.value * Math.pow(1024, fromIndex);
  const convertedSize = bytes / Math.pow(1024, toIndex);

  return roundToTwoDecimals(convertedSize);
};

export const percent = (nilai1: number, nilai2: number) => {
  return roundToTwoDecimals((nilai1 / nilai2) * 100);
};
