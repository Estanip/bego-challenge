import { NextFunction, Request, Response } from "express";
import { getDistanceBetweenTwoPoints } from "../services/google-maps";
import { IPoint } from "../interfaces/Point";
import { IRoute } from "../interfaces/Route";
import Point from "../models/point";
import Route from "../models/route";
import Order from "../models/order";

export class RoutesController {
  public async getRouteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const route: IRoute = await Route.findById(id).exec();

      if (!route) {
        res
          .status(404)
          .send({ success: false, message: "Route does not found" });

        return next();
      }

      res.status(200).send(route);

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to get route by id",
      });
      return next(error);
    }
  }

  public async deleteRouteById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const validateRouteAtOrder = await Order.aggregate([
        { $match: { route: id, status: "inProcess" } },
      ]);

      if (validateRouteAtOrder?.length > 0) {
        res.status(403).send({
          success: false,
          message: "Cannot delete, route is in an order in process",
        });

        return next();
      }

      const route: IRoute = await Route.findByIdAndDelete(id).exec();

      if (route) {
        res
          .status(200)
          .send({ success: true, message: "Route successfully removed" });

        return next();
      }

      res
        .status(404)
        .send({ success: false, message: "Route does not exists" });

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to get delete route",
      });
      return next(error);
    }
  }

  public async updateRouteById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { pointAId, pointBId } = req.body;

      if (pointAId === pointBId) {
        res.status(403).send({
          success: false,
          message: "Origin and destination cannot be the same",
        });

        return next();
      }

      const validateRouteAtOrder = await Order.findOne({
        route: id,
        status: "inProcess",
      }).exec();

      if (validateRouteAtOrder) {
        res.status(403).send({
          success: false,
          message: "Cannot update, route is in an order in process",
        });

        return next();
      } else {
        const route: IRoute = await Route.findById(id).exec();

        if (route) {
          if (pointAId && pointBId) {
            const pointA: IPoint = await Point.findById(pointAId).exec();
            const pointB: IPoint = await Point.findById(pointBId).exec();

            if (!pointA || !pointB) {
              res
                .status(404)
                .send({ success: false, message: "Point does not exists" });

              return next();
            }

            const validateSimilarRoute = await Route.aggregate([
              {
                $match: {
                  from: pointA?.location?.name,
                  to: pointB?.location?.name,
                },
              },
            ]);

            if (validateSimilarRoute?.length > 0) {
              res
                .status(403)
                .send({ success: false, message: "Route already exists" });

              return next();
            }

            await Route.findByIdAndUpdate(id, {
              from: pointA?.location?.name,
              to: pointB?.location?.name,
            }).exec();
          }

          if (pointAId && !pointBId) {
            const pointA: IPoint = await Point.findById(pointAId).exec();

            if (!pointA) {
              res
                .status(404)
                .send({ success: false, message: "Point does not exists" });

              return next();
            }

            const validateSimilarRoute = await Route.aggregate([
              { $match: { from: pointA?.location?.name, to: route?.to } },
            ]);

            if (validateSimilarRoute?.length > 0) {
              res
                .status(403)
                .send({ success: false, message: "Route already exists" });

              return next();
            }

            await Route.findByIdAndUpdate(id, {
              from: pointA?.location?.name,
            }).exec();
          }

          if (!pointAId && pointBId) {
            const pointB: IPoint = await Point.findById(pointBId).exec();

            if (!pointB) {
              res
                .status(404)
                .send({ success: false, message: "Point does not exists" });

              return next();
            }

            const validateSimilarRoute = await Route.aggregate([
              { $match: { from: route?.from, to: pointB?.location?.name } },
            ]);

            if (validateSimilarRoute?.length > 0) {
              res
                .status(403)
                .send({ success: false, message: "Route already exists" });

              return next();
            }

            await Route.findByIdAndUpdate(id, {
              to: pointB?.location?.name,
            }).exec();
          }

          res
            .status(200)
            .send({ success: true, message: "Route successfully updated" });

          return next();
        }

        res
          .status(404)
          .send({ success: false, message: "Route does not exists" });

        return next();
      }
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to update route",
      });
      return next(error);
    }
  }

  public async createRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const { pointAId, pointBId } = req.body;

      const pointA: IPoint = await Point.findById(pointAId).exec();
      const pointB: IPoint = await Point.findById(pointBId).exec();

      if (pointA && pointB) {
        const validateRouteExists = await Route.findOne({
          from: pointA?.location?.name,
          to: pointB?.location?.name,
        }).exec();

        if (validateRouteExists) {
          res
            .status(400)
            .send({ success: false, message: "Route already exists" });

          return next();
        } else {
          let distance = await getDistanceBetweenTwoPoints(
            pointA?.location?.name,
            pointB?.location?.name
          );
          if (distance) distance = Math.floor(Number(distance) / 1000);

          await new Route({
            from: pointA?.location?.name,
            to: pointB?.location?.name,
            distance,
          }).save();

          res
            .status(200)
            .send({ success: true, message: "Route succesfully created" });
        }

        return next();
      }

      res.status(400).send({ success: false, message: "Cannot find point" });

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to create route",
      });
      return next(error);
    }
  }
}
