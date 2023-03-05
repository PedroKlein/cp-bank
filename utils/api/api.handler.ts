import createHttpError from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiMethodHandlers, ErrorResponse, RequiredRoles } from "./types";
import { errorHandler } from "./error.handler";
import { Role, User } from "@prisma/client";
import { getSession } from "next-auth/react";

export function apiHandler(handler: ApiMethodHandlers) {
  return async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
    try {
      const session = await getSession({ req });

      const currentUser = session?.user as User;

      const method = req.method
        ? (req.method.toUpperCase() as keyof ApiMethodHandlers)
        : undefined;

      // check if handler supports current HTTP method
      if (!method)
        throw new createHttpError.MethodNotAllowed(
          `No method specified on path ${req.url}!`
        );

      const { handler: methodHandler, requiredRoles } = handler[method];
      if (!methodHandler)
        throw new createHttpError.MethodNotAllowed(
          `Method ${req.method} Not Allowed on path ${req.url}!`
        );

      checkRoles(requiredRoles, currentUser);

      return methodHandler(req, res);
    } catch (err) {
      return errorHandler(err, res);
    }
  };
}

function checkRoles(requiredRoles: RequiredRoles, user: User) {
  if (requiredRoles === "authenticated-user") {
    if (!user)
      throw new createHttpError.Unauthorized(
        "You need to be logged in to access."
      );
    return;
  }

  if (!requiredRoles?.length) return;

  if (!user || !requiredRoles.includes(user.role))
    throw new createHttpError.Unauthorized(
      "You dont have the necessary role to access this."
    );
}
