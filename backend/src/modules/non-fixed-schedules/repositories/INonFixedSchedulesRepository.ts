import NonFixedSchedule from '../infra/typeorm/entities/NonFixedSchedule';
import IScheduleDTO from '../dtos/INonFixedScheduleDTO';

export default interface INonFixedSchedulesRepository {
    create(data: IScheduleDTO): Promise<NonFixedSchedule>;
    find(): Promise<NonFixedSchedule[]>;
}
