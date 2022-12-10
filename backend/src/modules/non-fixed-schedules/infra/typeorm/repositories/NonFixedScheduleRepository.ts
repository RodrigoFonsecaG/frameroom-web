import { EntityRepository, getRepository, Repository } from 'typeorm';
import NonFixedSchedule from '../entities/NonFixedSchedule';
import INonFixedSchedulesRepository from '@modules/non-fixed-schedules/repositories/INonFixedSchedulesRepository';
import INonFixedScheduleDTO from '@modules/non-fixed-schedules/dtos/INonFixedScheduleDTO';

@EntityRepository(NonFixedSchedule)
class NonFixedScheduleRepository implements INonFixedSchedulesRepository {
    private ormRepository: Repository<NonFixedSchedule>;

    constructor() {
        this.ormRepository = getRepository(NonFixedSchedule);
    }

    public async find(): Promise<NonFixedSchedule[]> {
        const schedules = await this.ormRepository.find();

        return schedules;
    }

    public async create(data: INonFixedScheduleDTO) {
        const schedule = this.ormRepository.create(data);

        await this.ormRepository.save(schedule);

        return schedule;
    }
}

export default NonFixedScheduleRepository;
