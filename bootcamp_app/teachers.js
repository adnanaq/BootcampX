const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
  JOIN assistance_requests
  ON teachers.id = assistance_requests.teacher_id
  JOIN students
  ON students.id = assistance_requests.student_id
  JOIN cohorts
  ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`

const values = [`${process.argv[2]}`]

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.teacher} `)
    })
  });