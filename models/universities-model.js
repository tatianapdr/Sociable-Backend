const model = {};

model.table = 'Universities';
model.fields = ['UniversityID', 'UniversityName'];

model.buildCreateQuery = (req) => {
  return `INSERT INTO ${model.table} SET
    UniversityName=:UniversityName`;
};

model.buildReadQuery = (req, variant) => {
  let where = '';
  switch (variant) {
    case 'primary':
      where = `WHERE UniversityID=:ID`;
      break;
    default:
      where = '';
  }
  return `SELECT ${model.fields.join(', ')} FROM ${model.table} ${where}`;
};

model.buildUpdateQuery = (req) => {
  return `UPDATE ${model.table} SET
    UniversityName=:UniversityName
    WHERE UniversityID=:ID`;
};

model.buildDeleteQuery = (req) => {
  return `DELETE FROM ${model.table} WHERE UniversityID=:ID`;
};

export default model;
