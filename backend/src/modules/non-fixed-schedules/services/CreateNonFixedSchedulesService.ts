import NonFixedSchedule from '../infra/typeorm/entities/NonFixedSchedule';
import INonFixedScheduleRepository from '../repositories/INonFixedSchedulesRepository';
import INonFixedScheduleDTO from '../dtos/INonFixedScheduleDTO';

class CreateINonFixedSchedulesService {
    constructor(private schedulesRepository: INonFixedScheduleRepository) {}

    public async execute(
        data: INonFixedScheduleDTO,
    ): Promise<NonFixedSchedule> {
        const schedule = await this.schedulesRepository.create(data);

        return schedule;
    }
}

export default CreateINonFixedSchedulesService;
