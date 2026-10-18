const model = {};

model.table = 'Societies';
model.fields = ['SocietyID', 'SocietyName', 'UniversityID'];

model.buildCreateQuery = (req) => {
  return `INSERT INTO ${model.table} SET
    SocietyName=:SocietyName,
    UniversityID=:UniversityID`;
};

model.buildReadQuery = (req, variant) => {
  const so = 'so'; // Societies
  const u = 'u'; // Universities

  const table = `${model.table} AS ${so}
    LEFT JOIN Universities AS ${u} ON ${so}.UniversityID = ${u}.UniversityID`;

  const fields = [`${so}.SocietyID`, `${so}.SocietyName`, `${so}.UniversityID`, `${u}.UniversityName AS UniversityName`];

  let where = '';
  switch (variant) {
    case 'primary':
      where = `WHERE ${so}.SocietyID=:ID`;
      break;
    case 'university':
      where = `WHERE ${so}.UniversityID=:ID`; // ID = UniversityID
      break;
    default:
      where = '';
  }

  return `SELECT ${fields.join(', ')} FROM ${table} ${where}`;
};

model.buildUpdateQuery = (req) => {
  return `UPDATE ${model.table} SET
    SocietyName=:SocietyName,
    UniversityID=:UniversityID
    WHERE SocietyID=:ID`;
};

model.buildDeleteQuery = (req) => {
  return `DELETE FROM ${model.table} WHERE SocietyID=:ID`;
};

export default model;
