const ONE_MINUTE_MS = 60 * 1000
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS
const ONE_DAY_MS = 24 * ONE_HOUR_MS

const DEFAULT_TOKEN_LIFESPAN_MS = 14 * ONE_DAY_MS
const RESET_PASSWORD_CODE_LIFESPAN = ONE_HOUR_MS

const ENVIRONMENT = {
  CURRENT: process.NODE_ENV || "development",
  DEVELOPMENT: "development",
  TESTING: "testing",
  STATGING: "staging",
  PRODUCTION: "production",
}





const FILE_UPLOAD_SETTINGS = {
  MAX_FILES: 10,
  MAX_SIZE_MB: 5,

  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif"],
  UPLOAD_DIRECTORY: "uploads",
  IMAGE_COMPRESSION_QUALITY: 80,
  MAX_FILE_NAME_LENGTH: 255,/
};

const EMAIL_VERIFICATION = {
  EXPIRY_TIME_MINUTES: 30, // Expiry time for verification links
  ATTEMPTS_LIMIT: 3, // Max attempts for email verification
};

const AUDIT_LOG_LEVELS = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
};

const CHAT_SETTINGS = {
  MESSAGE_HISTORY_LIMIT: 100, // Max messages to retain in chat history
  TYPING_INDICATOR_TIMEOUT_MS: 3000, // Timeout for typing indicator (in ms)
};

const INTERACTION_LIMITS = {
  MAX_COMMENTS_PER_USER: 10, // Max comments allowed per user
  COMMENT_TIMEOUT_MS: 60000, // Timeout for commenting (1 minute)
};

const SECURITY_TOKEN_SETTINGS = {
  TOKEN_EXPIRY_TIME: '15m', // Expiry time for security tokens
  TOKEN_SECRET: process.env.TOKEN_SECRET, // Secret key for token generation
};

const SUBSCRIPTION_PLANS = {
  FREE: { price: 0, features: ['Basic Support', 'Limited Features'] },
  TRIAL: { price: 0, features: ['Basic Support with', 'Limited Features with'] },
  PREMIUM: { price: 9.99, features: ['Priority Support', 'Full Features'] },
  ENTERPRISE: { price: 49.99, features: ['Dedicated Support', 'Custom Features'] },
};

const DATA_RETENTION_POLICY = {
  USER_DATA_RETENTION_DAYS: 365, // Retain user data for one year
  ANONYMOUS_DATA_RETENTION_DAYS: 180, // Retain anonymous data for six months
};



const LOG_LEVEL = "info" // (debug,info,warn,,error)
const ALLOWED_ORIGINS = ['http://example.com', 'http://localhost:3000']; // Allowed origins for CORS
const BACKUP_DIRECTORY = 'backups'; // Directory for storing backups
const BACKUP_RETENTION_DAYS = 7; // Number of days to keep backups
const MAINTENANCE_MODE = false; // Flag to indicate if the application is in maintenance mode


const PAYMENT_OPTIONS = {
  GATEWAY_URL: 'https://api.paymentgateway.com',
  TIMEOUT_MS: 30000,
  RETRY_LIMIT: 3,
  RETRY_INTERVAL: 60000,
  DEFAULT_CURRENCY: 'AZN',
}


// payment


const ANALYTICS_TRACKING_ID = "UA-XXXXXXXXXX-X"
const CONTENT_SECURITY_POLICY = "default-src 'self'; img-src 'self' data:;"; // Basic CSP configuration

const VALIDATION_POLICY = {
  PASSWORD_POLICY: {
    MIN_LENGTH: 8, // Minimum password length
    REQUIRE_NUMERIC: true, // Require at least one numeric character
    REQUIRE_SPECIAL: true,
  }
}


const WEBSOCKET_URL = 'wss://example.com/socket'; // WebSocket connection URL
const WEBSOCKET_RECONNECT_INTERVAL_MS = 5000;


const DB_CONNECTION_OPTIONS = {
  MAX_CONNECTIONS: 10, // Maximum database connections
  TIMEOUT: 30000, // Connection timeout in milliseconds
};

const FILE_UPLOAD_CONSTRAINTS = {
  MAX_TOTAL_SIZE_MB: 50, // Maximum total size for all uploads in MB
  FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'], // Allowed file types
};

const EMAIL_CONFIG = {
  SMTP_HOST: 'smtp.example.com', // SMTP server host
  SMTP_PORT: 587, // SMTP server port
  DEFAULT_FROM_ADDRESS: 'no-reply@example.com', // Default sender email
};

const NOTIFICATION_FREQUENCY = {
  IMMEDIATE: 'immediate',
  DAILY: 'daily',
  WEEKLY: 'weekly',
};

const API_KEYS = {
  GOOGLE_MAPS_API_KEY: "your-google-maps-api-key",
  STRIPE_API_KEY: "your-stripe-api-key",
}


const USER_ROLE_ADMIN = 'admin'; // Role for admin users
const USER_ROLE_MEMBER = 'member'; // Role for regular members
const USER_ROLE_GUEST = 'guest'; // Role for guest users



const DEFAULT_LANGUAGE = "en"
const DEFAULT_TIMEZONE = "UTC"
const SEARCH_RESULTS_PER_PAGE = 10


const CACHE_SETTINGS = {
  CACHE_EXPIRATION_TIME: 300,
  MAX_SIZE_MB: 1000
}


const EMAIL_TEMPLATES = {
  WELCOME: 'welcome_template.html',
  PASSWORD_RESET: 'password_reset_template.html',
  ORDER_CONFIRMATION: 'order_confirmation_template.html',
};
const FEATURE_TRACKING_ENABLED = true; // Enable/disable feature usage tracking
const TEMP_FILE_EXPIRY_HOURS = 24; // Expiry time for temporary files (in hours)

const UI_SETTINGS = {
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_THEME: 'light',
  SHOW_TOOLTIPS: true, // Show tooltips in the UI
};

const API_RESPONSE_MESSAGES = {
  SUCCESS: 'Request successful',
  FAILURE: 'Request failed',
  NOT_FOUND: 'Resource not found',
};

const TEST_DATABASE_URL = 'mongodb://localhost:27017/test_db'; // Database URL for testing
const TEST_TIMEOUT = 10000; // Timeout for tests (in ms)


const API_RESPONSE_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};


const SESSION_STORAGE_OPTIONS = {
  MEMORY: 'memory',
  DATABASE: 'database',
};

const DEFAULT_PROFILE_IMAGE_URL = '/images/default-profile.png'; // Default profile image URL



const SOCIAL_MEDIA_LINKS = {
  FACEBOOK: 'https://facebook.com/share?url=',
  TWITTER: 'https://twitter.com/share?url=',
  LINKEDIN: 'https://linkedin.com/shareArticle?url=',
};

const API_ENDPOINTS = {
  USER_LOGIN: '/api/v1/auth/login',
  USER_REGISTER: '/api/v1/auth/register',
  GET_USER_PROFILE: '/api/v1/users/profile',
};

const FILE_DOWNLOAD = {
  MAX_DOWNLOAD_SIZE_MB: 50, // Max size for downloads in MB
  DOWNLOAD_TIMEOUT_MS: 30000, // Timeout for download requests
};

const SEO_SETTINGS = {
  DEFAULT_TITLE: 'My Application', // Default title for SEO
  DEFAULT_DESCRIPTION: 'Welcome to My Application', // Default description for SEO
};

const MARKETING_CAMPAIGNS = {
  ENABLE_EMAIL_CAMPAIGNS: true, // Enable email marketing campaigns
  MAX_CAMPAIGNS_PER_USER: 3, // Max campaigns allowed per user
};

const TRANSACTION_SETTINGS = {
  TRANSACTION_TIMEOUT_MS: 30000, // Timeout for transactions
  MAX_CONCURRENT_TRANSACTIONS: 5, // Max concurrent transactions
};

const API_VERSIONING = {
  CURRENT_VERSION: 'v1', // Current API version
  SUPPORTED_VERSIONS: ['v1', 'v2'], // Supported API versions
  ALL_VERSIONS: ["v1", "v2", "v3"]
};

const USER_ROLES = {
  ADMIN: { permissions: ['read', 'write', 'delete', 'manage_users'] },
  EDITOR: { permissions: ['read', 'write'] },
  VIEWER: { permissions: ['read'] },
};

const SUBSCRIPTION_RENEWAL = {
  AUTO_RENEWAL: true,
  RENEWAL_NOTIFICATION_DAYS: 7
}

const ERROR_HANDLING = {
  ENABLE_CUSTOM_ERROR_PAGES: true, // Enable custom error pages
  DEFAULT_ERROR_PAGE: '/error', // Default error page URL
};

const EMAIL_SENDING_LIMITS = {
  MAX_EMAILS_PER_HOUR: 100, // Maximum emails allowed to send per hour
  MAX_EMAILS_PER_DAY: 1000, // Maximum emails allowed to send per day
};

const TWO_FACTOR_AUTH = {
  ENABLED: true, // Enable two-factor authentication
  TIME_LIMIT_MINUTES: 10, // Time limit for entering the code
};

const DASHBOARD_CONFIG = {
  DEFAULT_WIDGETS: ['sales', 'user_activity', 'performance'], // Default widgets on dashboard
  REFRESH_INTERVAL_SECONDS: 60, // Refresh interval for dashboard data
};


const PRODUCT_SEARCH = {
  ENABLE_AUTOCOMPLETE: true, // Enable autocomplete in search
  MAX_SEARCH_RESULTS: 50, // Max search results to display
};

const DATA_EXPORT_FORMATS = {
  CSV: 'text/csv', // CSV export format
  JSON: 'application/json', // JSON export format
  XML: 'application/xml', // XML export format
};

const USER_AGREEMENT = {
  TERMS_AND_CONDITIONS_URL: '/terms', // URL for terms and conditions
  PRIVACY_POLICY_URL: '/privacy', // URL for privacy policy
};


module.exports = {
  DEFAULT_TOKEN_LIFESPAN_MS,
  RESET_PASSWORD_CODE_LIFESPAN,
  ONE_MINUTE_MS,
  API_VERSIONING,
  API_RESPONSE_CODES,
  API_RESPONSE_MESSAGES,
  ENVIRONMENT
}