const connection = require('../db/config');

const Booking = {}

Booking.getAll = (callback) => {
    connection.query(
        'select * from booking', 
        (err, results, fields) => callback(err, results, fields)
    );
};

Booking.create = (bookingInfo, callback) => {
    connection.query(
        `INSERT INTO booking (name, date, start_time, end_time, destination, vehicle_id)  
         VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )`,
        [bookingInfo.name, bookingInfo.date, bookingInfo.start_time, bookingInfo.end_time, bookingInfo.destination, +bookingInfo.vehicle_id],
        (err, results, fields) => callback(err, results, fields)
    );

};
    

Booking.update = (id, bookingInfo, callback) => {
    console.log(bookingInfo)
    connection.query( `UPDATE booking 
     SET
        start_time = ?,
        start_km = ?
     WHERE 
        id = ?`,
     [bookingInfo.start_time, bookingInfo.start_km, id], 
      (err, results) => {
        callback(err, results);
    },
    );
};

Booking.final = (id,bookingInfo, callback) => {
    connection.query(`UPDATE booking 
     SET 
        end_time = ?,
        end_km = ?
     WHERE 
        id = ?`,
    [bookingInfo.end_time, bookingInfo.end_km, +id], 
    (err, results) => {
        callback(err, results);
    },
    );
};


Booking.findById = (id, cb) => {
    const sql = `SELECT * FROM booking WHERE id = ?`;
    connection.query(sql, id, (err, results, fields) => {
        cb(err, results);
    });
};


Booking.delete = (id, callback) => {
    connection.query(
        'DELETE FROM booking WHERE id=?',
         id, (err, results, fields) => {
            callback(err, results, fields)
        }
    )

}

module.exports = Booking;