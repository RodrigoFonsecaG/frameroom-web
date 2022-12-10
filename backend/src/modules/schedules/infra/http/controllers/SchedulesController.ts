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

        console.log(data);

        try {
            const schedulesRepository = new SchedulesRepository();
            const createSchedules = new CreateScheduleService(
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

        let weekDate = request.query['weekDate'];

        const schedulesRepository = getRepository(Schedules);
        // const schedules = await schedulesRepository.find({
        //     where: { room_code },
        //     order: {
        //         interval: 'ASC',
        //     },
        // });

        const schedules =
            await schedulesRepository.query(`SELECT MAX(room_code) as room_code, interval, MAX(day_0) as day_0, MAX(day_1) as day_1, MAX(day_2) as day_2, MAX(day_3) as day_3, MAX(day_4) as day_4, MAX(day_5) as day_5 , MAX(day_6) as day_6 FROM (
  SELECT * FROM schedules
  WHERE schedules.room_code = '${room_code}'
  UNION
  SELECT room_code, interval, day_0, day_1, day_2, day_3, day_4, day_5, day_6 FROM non_fixed_schedules
  WHERE non_fixed_schedules.room_code = '${room_code}' AND non_fixed_schedules.week = '${weekDate}'
  ) t
  GROUP BY t.interval`);

        return response.json(schedules);
    }
}
