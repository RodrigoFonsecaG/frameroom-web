import { Request, Response } from 'express';
import CreateRoomService from '@modules/rooms/services/CreateRoomService';
import UpdateRoomService from '@modules/rooms/services/UpdateRoomService';
import { getCustomRepository, getRepository } from 'typeorm';
import RoomsRepository from '@modules/rooms/infra/typeorm/repositories/RoomsRepository';
import Room from '@modules/rooms/infra/typeorm/entities/Room';

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

        const createRoom = new CreateRoomService();

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

        const updateRoom = new UpdateRoomService();

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

            return response.json(rooms);
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

        return response.json(room);
    }
}
