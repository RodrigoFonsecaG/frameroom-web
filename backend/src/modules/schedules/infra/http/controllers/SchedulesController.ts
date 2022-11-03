import { Request, Response } from 'express';
import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import { getCustomRepository, getRepository } from 'typeorm';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';
import Schedules from '@modules/schedules/infra/typeorm/entities/Schedules';

export default class SchedulesController {
    public async create(request: Request, response: Response) {
        const {
            room_code,
            day,
            interval_1,
            interval_2,
            interval_3,
            interval_4,
            interval_5,
            interval_6,
            interval_7,
            interval_8,
            interval_9,
            interval_10,
            interval_11,
            interval_12,
            interval_13,
            interval_14,
            interval_15,
            interval_16,
        } = request.body;

        const data = request.body;

        const schedulesRepository = new SchedulesRepository();
        const createSchedules = new CreateScheduleService(schedulesRepository);

        const schedule = await createSchedules.execute(data);

        return response.json(schedule);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const room_code = request.params.room_code;

        const schedulesRepository = getRepository(Schedules);
        const schedules = await schedulesRepository.find({
            where: { room_code },
            order: {
                day: 'ASC',
            },
        });

        return response.json(schedules);
    }
}
