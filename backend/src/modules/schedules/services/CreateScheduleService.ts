import Schedules from '../infra/typeorm/entities/Schedules';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import IScheduleDTO from '../dtos/IScheduleDTO';

class CreateScheduleService {
    constructor(private schedulesRepository: ISchedulesRepository) {}

    public async execute(data: IScheduleDTO): Promise<Schedules> {
        const schedule = await this.schedulesRepository.create(data);

        return schedule;
    }
}

export default CreateScheduleService;
