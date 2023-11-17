require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_DB_URL:process.env.MONGO_DB_URL, 
    JWT_SECRETS: process.env.JWT_SECRETS || 'topsecret',
    JWT_ADMIN_EXPIRES: process.env.JWT_ADMIN_EXPIRES || '1d',
    MAIL_HOST:process.env.MAIL_HOST,
    MAIL_USER:process.env.MAIL_USER,
    MAIL_PASS:process.env.MAIL_PASS,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    FOLDER:process.env.FOLDER,
    API_KEY:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME
}