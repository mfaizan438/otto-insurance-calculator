const winston = require("winston");
require('winston-daily-rotate-file');
const WinstonCloudWatch = require('winston-cloudwatch');

/**
 * Configures and exports a Winston logger with JSON formatting and console transport.
 * The logger is also configured to support daily log rotation and CloudWatch integration.
 */
export const logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
      level: 'info',
    }),
  ],
});

/**
 * Configuration for Winston CloudWatch transport.
 * Includes AWS credentials, log group and stream names, and a custom message formatter.
 */
const cloudwatchConfig = {
  logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
  logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.CLOUDWATCH_REGION,
  messageFormatter: ({ level, message, additionalInfo }) => {
    console.log("----logs printed", level, message, additionalInfo)
    return `[${level}] : ${JSON.stringify(message)} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`;
  }
}

/**
 * Middleware function for logging request and response details.
 * Masks sensitive information in request body and limits response body size for CloudWatch.
 */
export const loggerMiddleWare = (req, res, next) => {

  const now = Date.now();
  const { method, originalUrl } = req;
  const userAgent = req.get('user-agent') || '';
  const androidBuildNo = req.get('build-number') || '';
  let body = null;
  if (req.body.password) {
    body = { ...req.body, password: '*********' };
  } else {
    body = req.body;
  }
  const oldJson = res.json;
  res.json = (responseBody) => {
    const size = Buffer.byteLength(JSON.stringify(responseBody)) / 1024;
    let finalResponse = responseBody;
    if (size > 256) {
      finalResponse =
        'This message is too large to be delivered to the cloudWatchLogs.';
    }
    const resp = {
      url: `${method} ${originalUrl} ${req.clientIp
        } ${userAgent} ${androidBuildNo} ${Date.now() - now} ms`,
      request: {
        body: body,
        token: req.headers.authorization,
      },
      response: {
        status: res.statusCode,
        resBody: finalResponse,
      },
    };
    logger.info(resp);
    return oldJson.call(res, responseBody);
  };
  next();

}
// Adds the CloudWatch transport to the logger with the specified configuration.
logger.add(new WinstonCloudWatch(cloudwatchConfig))
