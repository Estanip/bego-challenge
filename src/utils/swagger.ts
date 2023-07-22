import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";
const _ = require("lodash");

export async function setSwaggerResponse(app) {
  expressOasGenerator.handleResponses(app, {
    predefinedSpec: (spec: any) => {
      _.set(spec, "mongooseModels", mongoose.modelNames());
      _.set(spec, "paths['/auth/login'].post.tags", ["User"]);
      _.set(spec, "paths['/auth/register'].post.tags", ["User"]);

      _.set(spec, "components.securitySchemes.authorization", {
        type: "apiKey",
        in: "header",
        name: "authorization",
      });

      _.set(spec, "paths['/login'].post.security", []);
      _.set(spec, "paths['/register'].post.security", []);

      _.set(spec, "paths['/trucks'].get.security", [{ authorization: [] }]);

      _.set(spec, "paths['/orders'].post.security", [{ authorization: [] }]);
      _.set(spec, "paths['/orders/{id}'].delete.security", [
        { authorization: [] },
      ]);

      _.set(spec, "paths['/orders/{id}'].put.security", [
        { authorization: [] },
      ]);
      _.set(spec, "paths['/orders/{id}/status/{status}'].put.security", [
        { authorization: [] },
      ]);

      _.set(spec, "paths['/points'].get.security", [{ authorization: [] }]);
      _.set(spec, "paths['/points/coordinates/{placeId}'].get.security", [
        { authorization: [] },
      ]);

      _.set(spec, "paths['/routes'].post.security", [{ authorization: [] }]);
      _.set(spec, "paths['/routes/{id}'].get.security", [
        { authorization: [] },
      ]);
      _.set(spec, "paths['/routes/{id}'].put.security", [
        { authorization: [] },
      ]);
      _.set(spec, "paths['/routes/{id}'].delete.security", [
        { authorization: [] },
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
