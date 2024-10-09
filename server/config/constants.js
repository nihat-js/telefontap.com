const ONE_MINUTE_MS = 60 * 1000
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS
const ONE_DAY_MS = 24 * ONE_HOUR_MS

const DEFAULT_TOKEN_LIFESPAN_MS = 14 * ONE_DAY_MS
const RESET_PASSWORD_CODE_LIFESPAN = ONE_HOUR_MS

const MAX_IMAGE_UPLOAD_COUNT = 10
const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]
const UPLOAD_DIRECTORY = "uploads"
const IMAGE_COMPRESSION_QUALITY = 80
const MAX_FILE_NAME_LENGTH = 255; // Maximum length for uploaded file names

const LOG_LEVEL = "info" // (debug,info,warn,,error)
const ALLOWED_ORIGINS = ['http://example.com', 'http://localhost:3000']; // Allowed origins for CORS
const BACKUP_DIRECTORY = 'backups'; // Directory for storing backups
const BACKUP_RETENTION_DAYS = 7; // Number of days to keep backups
const MAINTENANCE_MODE = false; // Flag to indicate if the application is in maintenance mode

const PAYMENT_GATEWAY_URL = 'https://api.paymentgateway.com'; // Payment gateway URL
const PAYMENT_TIMEOUT_MS = 30000

const PASSWORD_MIN_LENGTH = 8
const MAX_LOGIN_ATTEMPTS = 5

const GOOGLE_MAPS_API_KEY = 'your-google-maps-api-key'; // API key for Google Maps
const STRIPE_API_KEY = 'your-stripe-api-key'; // API key for Stripe payment processing

const USER_ROLE_ADMIN = 'admin'; // Role for admin users
const USER_ROLE_MEMBER = 'member'; // Role for regular members
const USER_ROLE_GUEST = 'guest'; // Role for guest users

const ENVIRONMENT = process.env.NODE_ENV || 'development'; // Application environment (development/production)



module.exports = {
  DEFAULT_TOKEN_LIFESPAN_MS,
  RESET_PASSWORD_CODE_LIFESPAN
}