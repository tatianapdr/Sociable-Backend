const model = {};

model.table = 'Students';
model.fields = ['StudentID', 'StudentFirstName', 'StudentLastName', 'StudentEmail', 'UniversityID'];

model.buildCreateQuery = (req) => {
  return `INSERT INTO ${model.table} SET
    StudentFirstName=:StudentFirstName,
    StudentLastName=:StudentLastName,
    StudentEmail=:StudentEmail,
    UniversityID=:UniversityID`;
};

model.buildReadQuery = (req, variant) => {
  const st = 'st'; // Students
  const u = 'u'; // Universities

  const table = `${model.table} AS ${st}
    LEFT JOIN Universities AS ${u} ON ${st}.UniversityID = ${u}.UniversityID`;

  const fields = [
    `${st}.StudentID`,
    `${st}.StudentFirstName`,
    `${st}.StudentLastName`,
    `${st}.StudentEmail`,
    `${st}.UniversityID`,
    `${u}.UniversityName AS UniversityName`,
  ];

  let where = '';
  switch (variant) {
    case 'primary':
      where = `WHERE ${st}.StudentID=:ID`;
      break;
    default:
      where = '';
  }

  return `SELECT ${fields.join(', ')} FROM ${table} ${where}`;
};

model.buildUpdateQuery = (req) => {
  return `UPDATE ${model.table} SET
    StudentFirstName=:StudentFirstName,
    StudentLastName=:StudentLastName,
    StudentEmail=:StudentEmail,
    UniversityID=:UniversityID
    WHERE StudentID=:ID`;
};

model.buildDeleteQuery = (req) => {
  return `DELETE FROM ${model.table} WHERE StudentID=:ID`;
};

export default model;
