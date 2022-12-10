import { Request, Response } from 'express';
import CreateNonFixedScheduleService from '@modules/non-fixed-schedules/services/CreateNonFixedSchedulesService';
import { getCustomRepository, getRepository } from 'typeorm';
import NonFixedScheduleRepository from '@modules/non-fixed-schedules/infra/typeorm/repositories/NonFixedScheduleRepository';
import NonFixedSchedule from '@modules/non-fixed-schedules/infra/typeorm/entities/NonFixedSchedule';

export default class NonFixedScheduleController {
    public async create(request: Request, response: Response) {
        const {
            room_code,
            interval,
            week,
            day_0,
            day_1,
            day_2,
            day_3,
            day_4,
            day_5,
            day_6,
        } = request.body;

        const data = request.body;

        try {
            const schedulesRepository = new NonFixedScheduleRepository();
            const createSchedules = new CreateNonFixedScheduleService(
                schedulesRepository,
            );

            const schedule = await createSchedules.execute(data);

            return response.json(schedule);
        } catch (error) {
            console.error(error);
        }
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const room_code = request.params.room_code;

        const schedulesRepository = getRepository(NonFixedSchedule);
        const schedules = await schedulesRepository.find({
            where: { room_code },
            order: {
                interval: 'ASC',
            },
        });

        return response.json(schedules);
    }
}
