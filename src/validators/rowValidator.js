const EXPECTED_COLUMNS = [
  "name",
  "address",
  "first_release_year",
  "no_of_album_release",
  "dob",
  "gender",
];

const validateHeaders = (headers) => {
  return JSON.stringify(headers) === JSON.stringify(EXPECTED_COLUMNS);
};

const validateRow = (row) => {
  const errors = [];

  if (!row.name || typeof row.name !== "string") errors.push("Invalid name");
  if (!row.address || typeof row.address !== "string")
    errors.push("Invalid address");
  if (!row.first_release_year || isNaN(Number(row.first_release_year)))
    errors.push("Invalid first release year");
  if (!row.no_of_album_release || isNaN(Number(row.no_of_album_release)))
    errors.push("Invalid number of album releases");
  if (!row.dob || isNaN(Date.parse(row.dob)))
    errors.push("Invalid date of birth");
  if (!["m", "f", "o"].includes(row.gender)) errors.push("Invalid gender");

  return errors;
};

export { validateRow, validateHeaders };
