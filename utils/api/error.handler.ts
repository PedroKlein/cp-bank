import { NextApiResponse } from "next";
import { ErrorResponse } from "./types";
import createHttpError from "http-errors";
import axios from "axios";

export function errorHandler(
  err: unknown,
  res: NextApiResponse<ErrorResponse>
) {
  if (createHttpError.isHttpError(err) && err.expose) {
    // Handle all errors thrown by http-errors module
    return res.status(err.statusCode).json({ error: { message: err.message } });
  } else if (axios.isAxiosError(err)) {
    res.status(err.status || 500).json({ error: { message: err.message } });
  } else {
    // default to 500 server error
    console.error(err);
    return res.status(500).json({
      error: { message: "Internal Server Error", err: err },
      status: createHttpError.isHttpError(err) ? err.statusCode : 500,
    });
  }
}
