import { Role } from "@prisma/client";
import { Method } from "axios";
import { NextApiHandler } from "next";

export interface ErrorResponse {
  error: {
    message: string;
    err?: any; // Sent for unhandled errors reulting in 500
  };
  status?: number; // Sent for unhandled errors reulting in 500
}

export type RequiredRoles = Role[] | "authenticated-user";

export type ApiMethodHandlers = {
  [key in Uppercase<Method>]?: {
    handler: NextApiHandler;
    requiredRoles?: RequiredRoles;
  };
};
