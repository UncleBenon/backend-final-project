import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: "https://fb9014cefd62dd32c0258aa1c6045b49@o4510957599457280.ingest.de.sentry.io/4510957676003408",
    enableLogs: true,
    sendDefaultPii: true,
});
