var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'ddgum4qro54d1s',
    user: 'qtztcjqltxfyyu',
    password: '677c91522a8fcbd2c867cb74c9016c3a0638459e32c2ce02e1d9933118116a73'
    }
    }
    
    var connectionString = "postgres://qtztcjqltxfyyu:677c91522a8fcbd2c867cb74c9016c3a0638459e32c2ce02e1d9933118116a73@ec2-54-74-156-137.eu-west-1.compute.amazonaws.com:5432/ddgum4qro54d1s";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }