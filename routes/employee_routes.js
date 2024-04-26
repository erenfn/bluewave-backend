const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { auth } = require('../auth');
router.use(express.json());

router.use(auth);
// const { verifyToken } = require('../auth');
// router.use(verifyToken);

// Get employees
router.get('/', (req, res) =>
  Employee.findAll()
    .then(employees => res.json(employees))
    .catch(err => res.status(500).json({ error: 'Internal server error' })));


// Add an employee
router.post('/add', (req, res) => {
  const { name, status, role, team, hireDate } = req.body;

  //controller
  if (status !== 'active' && status !== 'inactive') {
    return res.status(400).json({ error: 'Status must be either "active" or "inactive"' });
  }

  if (
    typeof name !== 'string' ||
    typeof status !== 'string' ||
    typeof role !== 'string' ||
    typeof team !== 'string' ||
    !isValidDate(hireDate)
  ) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  //db
  Employee.create({
    name,
    status,
    role,
    team,
    hireDate
  })
    .then(employee => res.status(201).json({ message: 'Employee added successfully' }))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

function isValidDate(dateString) {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  return regexDate.test(dateString);
}

module.exports = router;
