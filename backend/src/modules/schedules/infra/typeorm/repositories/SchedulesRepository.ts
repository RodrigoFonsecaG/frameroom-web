import { EntityRepository, getRepository, Repository } from 'typeorm';
import Schedules from '../entities/Schedules';
import IScheduleRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IScheduleDTO from '@modules/schedules/dtos/IScheduleDTO';


@EntityRepository(Schedules)
class SchedulesRepository implements IScheduleRepository {
    private ormRepository: Repository<Schedules>;

    constructor() {
        this.ormRepository = getRepository(Schedules);
    }

    public async find(): Promise<Schedules[]> {
        const schedules = await this.ormRepository.find();

        return schedules;
    }

    public async create(data: IScheduleDTO) {
        const schedule = this.ormRepository.create(data);

        await this.ormRepository.save(schedule);

        return schedule;
    }
}

export default SchedulesRepository;
