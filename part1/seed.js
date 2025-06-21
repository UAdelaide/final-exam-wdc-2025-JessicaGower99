const db = require('./db');

async function seedDatabase() {
    try {
        // users table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('owner', 'walker') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // insert into users
        const [userRows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
        if (userRows[0].count === 0) {
            await db.execute(`
        INSERT INTO Users (username, email, password_hash, role) VALUES
        ('alice123', 'alice@example.com', 'hashed123', 'owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol123', 'carol@example.com', 'hashed789', 'owner'),
        ('jessgower', 'jessgower@example.com', 'hashed999', 'owner'),
        ('edwingower', 'edwingower@example.com', 'hashed002', 'walker')
      `);
        }

        // dogs table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS Dogs (
        dog_id INT AUTO_INCREMENT PRIMARY KEY,
        owner_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        size ENUM('small', 'medium', 'large') NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES Users(user_id)
      )
    `);

        // insert into dogs
        const [dogRows] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
        if (dogRows[0].count === 0) {
            await db.execute(`
        INSERT INTO Dogs (owner_id, name, size)
        VALUES
          ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
          ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
          ((SELECT user_id FROM Users WHERE username = 'jessgower'), 'Honey', 'small'),
          ((SELECT user_id FROM Users WHERE username = 'edwingower'), 'Nelson', 'large'),
          ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Winnie', 'small')
      `);
        }

        // walk request table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS WalkRequests (
        request_id INT AUTO_INCREMENT PRIMARY KEY,
        dog_id INT NOT NULL,
        requested_time DATETIME NOT NULL,
        duration_minutes INT NOT NULL,
        location VARCHAR(255) NOT NULL,
        status ENUM('open', 'accepted', 'completed', 'cancelled') DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dog_id) REFERENCES Dogs(dog_id)
      )
    `);

        // insert into wak requests
        const [walkRows] = await db.execute('SELECT COUNT(*) AS count FROM WalkRequests');
        if (walkRows[0].count === 0) {
            await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        VALUES
          ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
          ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
          ((SELECT dog_id FROM Dogs WHERE name = 'Honey'), '2025-06-21 11:00:00', 60, 'Pasadena', 'open'),
          ((SELECT dog_id FROM Dogs WHERE name = 'Nelson'), '2025-06-22 11:30:00', 50, 'Stirling', 'open'),
          ((SELECT dog_id FROM Dogs WHERE name = 'Winnie'), '2025-06-20 10:00:00', 24, 'Unley Road', 'accepted')
      `);
        }

        // walk applictaions table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS WalkApplications (
        application_id INT AUTO_INCREMENT PRIMARY KEY,
        request_id INT NOT NULL,
        walker_id INT NOT NULL,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
        FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
        FOREIGN KEY (walker_id) REFERENCES Users(user_id),
        CONSTRAINT unique_application UNIQUE (request_id, walker_id)
      )
    `);

        // walk ratinsg table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS WalkRatings (
        rating_id INT AUTO_INCREMENT PRIMARY KEY,
        request_id INT NOT NULL,
        walker_id INT NOT NULL,
        owner_id INT NOT NULL,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        comments TEXT,
        rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
        FOREIGN KEY (walker_id) REFERENCES Users(user_id),
        FOREIGN KEY (owner_id) REFERENCES Users(user_id),
        CONSTRAINT unique_rating_per_walk UNIQUE (request_id)
      )
    `);

        const [ratingRows] = await db.execute('SELECT COUNT(*) AS count FROM WalkRatings');
        if (ratingRows[0].count === 0) {
            await db.execute(`
        INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments)
        VALUES (
          (SELECT request_id FROM WalkRequests WHERE location = 'Unley Road'),
          (SELECT user_id FROM Users WHERE username = 'edwingower'),
          (SELECT user_id FROM Users WHERE username = 'alice123'),
          5,
          'Edwin did a great job walking Winnie!'
        )
      `);
        }

        console.log('Seeding successful. All tables created and seeded if empty.');
    } catch (err) {
        console.error('Seeding failed:', err.message);
    }
}

module.exports = seedDatabase;
