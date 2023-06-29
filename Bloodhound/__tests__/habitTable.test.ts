import { db } from "../data/database";

const getAllTables = (databaseName: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    // Open the database connection
    // Define the query to retrieve all table names
    const query = `SELECT name FROM sqlite_master WHERE type='table';`;

    // Execute the query
    db.transaction((transaction) => {
      transaction.executeSql(query, [], (_, result) => {
        // Retrieve the table names from the query result
        const tableNames: string[] = [];
        if (result.rows && result.rows.length) {
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            tableNames.push(row.name);
          }
        }

        // Resolve with the table names
        resolve(tableNames);
      }, (_, error) => {
        reject(error);
        return true;
      });
    });
  });
};

describe('Habit Table', () => {
  it('should create the Habit table', async () => {
    const databaseName = 'habits.db';

    try {
      const tableNames = await getAllTables(databaseName);
      console.log('Existing Tables:', tableNames || []);
      const habitTableExists = tableNames && tableNames.includes('habits');
      expect(habitTableExists).toBeTruthy();
    } catch (error) {
      console.error('Error:', error);
      expect(error).toBeNull();
    }
  });
});