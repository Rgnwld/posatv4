async function InsertUser(username, pswd) {
    try {
        await ExecuteSQL(
            db,
            `INSERT INTO users (name, pwd) VALUES ('${username}', '${pswd}')`
        );
    } catch (error) {
        console.log(error);
    } finally {
        db.close();
    }
};
