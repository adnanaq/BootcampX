const { Pool } = require('pg');

const args = process.argv.slice(2);
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts
ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2; `

const values = [`%${args[0]}%`, `${args[1] || 5}`]

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    })
  });
  // .catch (err => console.error('query error', err.stack));