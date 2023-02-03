import { Role } from "@prisma/client";
import { Method } from "axios";
import { NextApiHandler } from "next";

export interface ErrorResponse {
  error: {
    message: string;
    err?: any;
  };
  status?: number;
}

export type RequiredRoles = Role[] | "authenticated-user";

export type ApiMethodHandlers = {
  [key in Uppercase<Method>]?: {
    handler: NextApiHandler;
    requiredRoles?: RequiredRoles;
  };
};
