import { Request, Response } from 'express';
import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import { getCustomRepository, getRepository } from 'typeorm';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';
import Schedules from '@modules/schedules/infra/typeorm/entities/Schedules';

export default class SchedulesController {
    public async create(request: Request, response: Response) {
        const {
            room_code,
            interval,
            day_0,
            day_1,
            day_2,
            day_3,
            day_4,
            day_5,
            day_6,
        } = request.body;

        const data = request.body;

        console.log(data)

        try {
            const schedulesRepository = new SchedulesRepository();
            const createSchedules = new CreateScheduleService(
                schedulesRepository,
            );

            const schedule = await createSchedules.execute(data);

            return response.json(schedule);
        } catch (error) {
            console.error(error)
        }
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
                interval: 'ASC',
            },
        });

        return response.json(schedules);
    }
}
