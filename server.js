// server.js
const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

//Database connection configuration
const dbConfig = {
    user:  process.env.DB_USER, //'${DB_USER}',       // Replace with your database username
    password: process.env.DB_PASSWORD, //'${DB_PASSWORD}',   // Replace with your database password
    server: process.env.DB_HOST, //'${DB_HOST}',         // Replace with your database server
    database: process.env.DB_NAME,
    trustServerCertificate: true,
};


// const dbConfig = {
//   user:  'sa',  //'${DB_USER}',       // Replace with your database username
//   password: 'Admin@12345', //'${DB_PASSWORD}',   // Replace with your database password
//   server: 'localhost', //'${DB_HOST}',         // Replace with your database server
//   database: 'collegeerp',
//   trustServerCertificate: 'true',
//   options: {
//     trustServerCertificate: true, // add this line
//   }
// };

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express.urlencoded({ extended: true }));



// Route handler for the homepage
app.get('/', (req, res) => {
  // Establish a connection to the database
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log('Database connection failed:', err);
      return res.status(500).send('Database connection failed');
    }

    // Create a SQL query to retrieve student and course data
    const query = 'SELECT * FROM students; SELECT * FROM courses';

    // Execute the query
    new sql.Request().query(query, (err, result) => {
      if (err) {
        console.log('Query execution failed:', err);
        sql.close();
        return res.status(500).send('Query execution failed');
      }

      const students = result.recordsets[0];
      const courses = result.recordsets[1];

      // Render the EJS template with the retrieved data
      res.render('index', { students: students, courses: courses });

      // Close the database connection
      sql.close();
    });
  });
});


// Route handler for adding a new student
app.post('/students/add', (req, res) => {
  const { name, email, course, dob, phone } = req.body;

  // Establish a connection to the database
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log('Database connection failed:', err);
      return res.status(500).send('Database connection failed');
    }

    // Create a SQL query to insert student data
    const query = `INSERT INTO students (name, email, course, dob, phone) VALUES ('${name}', '${email}', '${course}', '${dob}', '${phone}')`;

    // Execute the query
    new sql.Request().query(query, (err) => {
      if (err) {
        console.log('Query execution failed:', err);
        sql.close();
        return res.status(500).send('Query execution failed');
      }

      // Redirect back to the homepage after successful insertion
      res.redirect('/');

      // Close the database connection
      sql.close();
    });
  });
});

// Route handler for adding a new course
app.post('/courses/add', (req, res) => {
  const { name } = req.body;

  // Establish a connection to the database
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log('Database connection failed:', err);
      return res.status(500).send('Database connection failed');
    }

    // Create a SQL query to insert course data
    const query = `INSERT INTO courses (name) VALUES ('${name}')`;

    // Execute the query
    new sql.Request().query(query, (err) => {
      if (err) {
        console.log('Query execution failed:', err);
        sql.close();
        return res.status(500).send('Query execution failed');
      }

      // Redirect back to the homepage after successful insertion
      res.redirect('/');

      // Close the database connection
      sql.close();
    });
  });
});

// Route handler for displaying the courses page
app.get('/courses', (req, res) => {
  res.render('courses');
});


// Route handler for displaying all students
app.get('/students', (req, res) => {
  // Establish a connection to the database
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log('Database connection failed:', err);
      return res.status(500).send('Database connection failed');
    }

    // Create a SQL query to retrieve all students
    const query = 'SELECT * FROM students';

    // Execute the query
    new sql.Request().query(query, (err, result) => {
      if (err) {
        console.log('Query execution failed:', err);
        sql.close();
        return res.status(500).send('Query execution failed');
      }

      const students = result.recordset;

      // Render the EJS template with the retrieved data
      res.render('students', { students: students });

      // Close the database connection
      sql.close();
    });
  });
});



//delete student from the database
app.delete('/students/delete/:id', (req, res) => {
  const id = req.params.id;

  // Establish a connection to the database
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log('Database connection failed:', err);
      return res.status(500).send({ success: false, message: 'Database connection failed' });
    }

    // Create a SQL query to delete the student with the given ID
    const query = `DELETE FROM students WHERE id = ${id}`;

    // Execute the query
    new sql.Request().query(query, (err) => {
      if (err) {
        console.log('Query execution failed:', err);
        sql.close();
        return res.status(500).send({ success: false, message: 'Query execution failed' });
      }

      // If the query was successful, send a success response
      res.send({ success: true });

      // Close the database connection
      sql.close();
    });
  });
});



// Route handler for getting the total number of students
app.get('/students/total', (req, res) => {
  // Establish a connection to the database
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log('Database connection failed:', err);
      return res.status(500).send('Database connection failed');
    }

    // Create a SQL query to count all students
    const query = 'SELECT COUNT(*) AS total FROM students';

    // Execute the query
    new sql.Request().query(query, (err, result) => {
      if (err) {
        console.log('Query execution failed:', err);
        sql.close();
        return res.status(500).send('Query execution failed');
      }

      const total = result.recordset[0].total;

      // Send the total number of students as the response
      res.json({ total: total });

      // Close the database connection
      sql.close();
    });
  });
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
