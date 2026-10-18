const model = {};

model.table = 'Events';
model.fields = ['EventID', 'EventTitle', 'EventStartDateTime', 'EventEndDateTime', 'EventLocation', 'EventImageURL', 'SocietyID'];

model.buildCreateQuery = (req) => {
  return `INSERT INTO ${model.table} SET
    EventTitle=:EventTitle,
    EventStartDateTime=:EventStartDateTime,
    EventEndDateTime=:EventEndDateTime,
    EventLocation=:EventLocation,
    EventImageURL=:EventImageURL,
    SocietyID=:SocietyID`;
};

model.buildReadQuery = (req, variant) => {
  const e = 'e'; // Events
  const so = 'so'; // Societies
  const u = 'u'; // Universities

  const table = `${model.table} AS ${e}
    LEFT JOIN Societies AS ${so} ON ${e}.SocietyID = ${so}.SocietyID
    LEFT JOIN Universities AS ${u} ON ${so}.UniversityID = ${u}.UniversityID`;

  const fields = [
    `${e}.EventID`,
    `${e}.EventTitle`,
    `${e}.EventStartDateTime`,
    `${e}.EventEndDateTime`,
    `${e}.EventLocation`,
    `${e}.EventImageURL`,
    `${e}.SocietyID`,
    `${so}.SocietyName AS SocietyName`,
    `${u}.UniversityName AS SocietyUniversityName`,
  ];

  let where = '';
  switch (variant) {
    case 'primary':
      where = `WHERE ${e}.EventID=:ID`;
      break;
    case 'society':
      where = `WHERE ${e}.SocietyID=:ID AND ${e}.EventStartDateTime >= NOW()`;
      break;
    case 'university':
      where = `WHERE ${so}.UniversityID=:ID AND ${e}.EventStartDateTime >= NOW()`;
      break;
    case 'student':
      where = `WHERE ${so}.UniversityID = (SELECT UniversityID FROM Students WHERE StudentID=:ID)
        AND ${e}.EventStartDateTime >= NOW()`;
      break;
    default:
      where = '';
  }

  return `SELECT ${fields.join(', ')} FROM ${table} ${where} ORDER BY ${e}.EventStartDateTime ASC`;
};

model.buildUpdateQuery = (req) => {
  return `UPDATE ${model.table} SET
    EventTitle=:EventTitle,
    EventStartDateTime=:EventStartDateTime,
    EventEndDateTime=:EventEndDateTime,
    EventLocation=:EventLocation,
    EventImageURL=:EventImageURL,
    SocietyID=:SocietyID
    WHERE EventID=:ID`;
};

model.buildDeleteQuery = (req) => {
  return `DELETE FROM ${model.table} WHERE EventID=:ID`;
};

export default model;
