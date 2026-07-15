# Pantry Label Platform Database Setup

This directory contains the database initialization files for the Pantry Label Platform.

## Requirements
- MySQL 8.x
- A database named `pantry_label_db`

## Configuration
The backend application connects to the database via configurations in `src/main/resources/application.properties`.
To customize the database username and password, you can set the following environment variables:
- `DB_URL`: JDBC Connection URL (defaults to `jdbc:mysql://localhost:3306/pantry_label_db`)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password

## Step-by-Step Setup

1. **Log in to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Create the Database:**
   ```sql
   CREATE DATABASE IF NOT EXISTS pantry_label_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Import the Schema:**
   Run the `schema.sql` file to create the tables:
   ```bash
   mysql -u root -p pantry_label_db < database/schema.sql
   ```

4. **Import Sample Data:**
   Run the `sample_data.sql` file to load initial states, categories, and bilingual ingredients:
   ```bash
   mysql -u root -p pantry_label_db < database/sample_data.sql
   ```

Now, the database is fully configured and populated with state-wise bilingual products ready for rendering.
