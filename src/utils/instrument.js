import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: "https://2b81c0ebb2ea84a571584bd30f9d5872@o4510957599457280.ingest.de.sentry.io/4510957621674064",
    enableLogs: true,
    sendDefaultPii: true,
});
