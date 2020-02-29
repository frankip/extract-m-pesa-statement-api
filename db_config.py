import sqlite3

try:
    sqliteConnection = sqlite3.connect('africas.sqlite')
    sqlite_create_table_query = '''CREATE TABLE user_db (
                                id INTEGER PRIMARY KEY,
                                first_name TEXT NOT NULL,
                                last_name TEXT NOT NULL,
                                email text NOT NULL UNIQUE,
                                password text NOT NULL);'''

    
    sqlite_create_table_query2 = '''CREATE TABLE user_records_db (
                                id INTEGER PRIMARY KEY,
                                paid_in TEXT NOT NULL,
                                paid_out TEXT NOT NULL,
                                date_period text NOT NULL,
                                user text NOT NULL);'''
    cursor = sqliteConnection.cursor()
    print("Successfully Connected to SQLite")

    cursor.execute(sqlite_create_table_query)
    sqliteConnection.commit()

    cursor.execute(sqlite_create_table_query2)
    sqliteConnection.commit()
    print("SQLite table created")

    cursor.close()

except sqlite3.Error as error:
    print("Error while creating a sqlite table", error)
finally:
    if (sqliteConnection):
        sqliteConnection.close()
        print("sqlite connection is closed")