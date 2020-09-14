SELECT name, id, cohort_id
FROM students
WHERE end_date is NULL
ORDER BY cohort_id;