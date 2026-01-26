const isDevelopment = process.env.NODE_ENV === "development";
export const BASE_URL = isDevelopment
  ? process.env.BASE_URL_DEV
  : process.env.BASE_URL_PROD;
