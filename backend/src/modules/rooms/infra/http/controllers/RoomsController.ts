import { Request, Response } from 'express';
import CreateRoomService from '@modules/rooms/services/CreateRoomService';
import UpdateRoomService from '@modules/rooms/services/UpdateRoomService';
import DeleteRoomService from '@modules/rooms/services/DeleteRoomService';
import { getCustomRepository, getRepository } from 'typeorm';
import RoomsRepository from '@modules/rooms/infra/typeorm/repositories/RoomsRepository';
import Room from '@modules/rooms/infra/typeorm/entities/Room';
import { instanceToInstance } from 'class-transformer';

export default class RoomsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
        } = request.body;

        const { filename } = request.file;

        const roomsRepository = new RoomsRepository();
        const createRoom = new CreateRoomService(roomsRepository);

        const room = await createRoom.execute({
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image: filename,
        });

        return response.json(room);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const room_code = request.params.id;

        const roomsRepository = new RoomsRepository();
        const deleteRoom = new DeleteRoomService(roomsRepository);

        const room = await deleteRoom.execute(room_code);

        return response.json(room);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
        } = request.body;

        const roomsRepository = new RoomsRepository();
        const updateRoom = new UpdateRoomService(roomsRepository);

        console.log(!!request.file);

        if (!!request.file) {
            const room = await updateRoom.execute({
                room_code,
                room_type,
                room_number,
                capacity,
                floor,
                description,
                availability,
                image: request.file.filename,
            });

            return response.json(room);
        } else {
            const room = await updateRoom.execute({
                room_code,
                room_type,
                room_number,
                capacity,
                floor,
                description,
                availability,
            });

            return response.json(room);
        }
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const roomsRepository = getCustomRepository(RoomsRepository);
            const rooms = await roomsRepository.find();

            return response.json(instanceToInstance(rooms));
        } catch (error) {
            console.error(error);
        }
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const room_code = request.params.room_code;

        const roomsRepository = getRepository(Room);
        const room = await roomsRepository.find({
            where: { room_code },
        });

        return response.json(instanceToInstance(room));
    }

    public async showOnDay(
        request: Request,
        response: Response,
    ): Promise<Response> {


        const interval = request.query["interval"]
        const day = request.query['day'];

        console.log(interval)
        console.log(day);

        try {
            const roomsRepository = getRepository(Room);
            const rooms =
                await roomsRepository.query(`SELECT room_code, interval, MAX(room_type) as room_type, MAX(room_number) as room_number, MAX(floor) as floor, MAX(${day}) as ${day} FROM (
  SELECT non_fixed_schedules.room_code, non_fixed_schedules.interval, non_fixed_schedules.${day}, rooms.room_type, rooms.room_number, rooms.floor
  FROM non_fixed_schedules
  LEFT JOIN rooms
  ON non_fixed_schedules.room_code = rooms.room_code
  WHERE non_fixed_schedules.week = '05/12/2022 à 11/12/2022' AND non_fixed_schedules.interval = ${interval}
      UNION
  SELECT schedules.room_code, schedules.interval, schedules.${day}, rooms.room_type, rooms.room_number, rooms.floor
  FROM schedules
  LEFT JOIN rooms
  ON schedules.room_code = rooms.room_code
  WHERE schedules.interval = ${interval}
  ) t
  GROUP BY  t.room_code, t.interval
  ORDER BY t.room_code, t.interval`);

            return response.json(rooms);
        } catch (error) {
            console.error(error);
        }
    }
}
