import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";
const _ = require("lodash");

export async function setSwaggerResponse(app) {
  expressOasGenerator.handleResponses(app, {
    predefinedSpec: (spec: any) => {
      /* AUTHORIZATION */
      _.set(spec, "securityDefinitions.access_token", {
        type: "apiKey",
        in: "header",
        name: "access_token",
      });

      /* LOGIN */
      _.set(spec, "paths['/auth/login'].post.tags", ["User"]);
      _.set(spec, "paths['/auth/login'].post.parameters", [
        {
          in: "body",
          name: "user",
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      ]);
      _.set(spec, "paths['/auth/login'].post.security", []);

      /* REGISTER */
      _.set(spec, "paths['/auth/register'].post.tags", ["User"]);
      _.set(spec, "paths['/auth/register'].post.parameters", [
        {
          in: "body",
          name: "user",
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      ]);
      _.set(spec, "paths['/auth/register'].post.security", []);

      _.set(spec, "paths['/trucks'].get.security", [{ access_token: [] }]);

      _.set(spec, "paths['/orders'].post.security", [{ access_token: [] }]);
      _.set(spec, "paths['/orders/{id}'].delete.security", [
        { access_token: [] },
      ]);

      _.set(spec, "paths['/orders/{id}'].put.security", [{ access_token: [] }]);
      _.set(spec, "paths['/orders/{id}/status/{status}'].put.security", [
        { access_token: [] },
      ]);

      _.set(spec, "paths['/points'].get.security", [{ access_token: [] }]);
      _.set(spec, "paths['/points/coordinates/{placeId}'].get.security", [
        { access_token: [] },
      ]);

      _.set(spec, "paths['/routes'].post.security", [{ access_token: [] }]);
      _.set(spec, "paths['/routes/{id}'].get.security", [{ access_token: [] }]);
      _.set(spec, "paths['/routes/{id}'].put.security", [{ access_token: [] }]);
      _.set(spec, "paths['/routes/{id}'].delete.security", [
        { access_token: [] },
      ]);
      return spec;
    },
    specOutputPath: "./src/api-docs/swagger.json",
    mongooseModels: mongoose.modelNames(),
    alwaysServeDocs: true,
    specOutputFileBehavior: "",
    swaggerDocumentOptions: undefined,
  });
}

export async function setSwaggerRequest() {
  expressOasGenerator.handleRequests();
}
