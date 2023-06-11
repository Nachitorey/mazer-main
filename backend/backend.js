const { Pool } = require('pg');

const pool = new Pool({
     host: 'localhost',
     user: 'postgres',
     password: 'PSJl23IT43ky1vxBCZVWy-2guTzIaKd_',
     database: 'lhihtpgb',
     port: '3000'
})

const getUsers = async(req, res) => {
    const response = await pool.query('SELECT * FROM Clientes');
    console.log(response.rows);
    res.send('Clientes');
}
module.exports = {
    getUsers
}
