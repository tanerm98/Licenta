const {
    queryAsync
} = require('..');

const getUserRegisters = async (limit) => {
    console.info(`Getting user registers data from database async...`);

    command = "select * from ( "
    command += "select today_date, sum(registers) "
    command += "from user_metrics "
    command += "group by today_date "
    command += "order by today_date desc "
    command += ") s "
    command += "order by today_date asc"
    if (limit != null) {
        command += "limit " + limit
    }

    return await queryAsync(command);
};

const getUserLogin = async (limit) => {
    console.info(`Getting user logins data from database async...`);

    command = "select * from ( "
    command += "select today_date, sum(logins) "
    command += "from user_metrics "
    command += "group by today_date "
    command += "order by today_date desc "
    command += ") s "
    command += "order by today_date asc"
    if (limit != null) {
        command += "limit " + limit
    }

    return await queryAsync(command);
};

module.exports = {
    getUserRegisters,
    getUserLogin
}