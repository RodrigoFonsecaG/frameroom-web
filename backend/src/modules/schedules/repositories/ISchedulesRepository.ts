import Schedules from '../infra/typeorm/entities/Schedules';
import IScheduleDTO from '../dtos/IScheduleDTO';

export default interface ISchedulesRepository {
    create(data: IScheduleDTO): Promise<Schedules>;
    find(): Promise<Schedules[]>;
}
