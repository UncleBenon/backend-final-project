import "dotenv/config";
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: process.env.SENTRY_DNS,
    enableLogs: true,
    sendDefaultPii: true,
});
