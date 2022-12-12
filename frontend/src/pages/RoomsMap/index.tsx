import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import Select from '../../components/Select';
import {
  MdOutlineStairs,
  MdOutlineMeetingRoom,
  MdOutlineBadge,
  MdOutlinePerson
} from 'react-icons/md';
import { Content } from './styles';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import RoomCard from '../../components/RoomCard';
import { FormHandles } from '@unform/core';
import moment from 'moment';
import { endOfWeek, startOfWeek } from 'date-fns';
import { formatDate } from '../../utils/convertDates';

interface RoomProps {
  room_code?: string;
  room_type: string;
  room_number: number;
  capacity: number;
  floor: number;
  description: string;
  availability: number;
  image: string;
}

const RoomsMap = () => {
  const [rooms, setRooms] = useState<RoomProps[]>();
  const [filteredRooms, setFilteredRooms] = useState<RoomProps[]>();
  const formRef = useRef<FormHandles>(null);

  function handleSubmit(data: object): void {
    const filteredRooms = rooms.filter((room) => {
      if (data.type && data.floor) {
        return room.room_type === data.type && room.floor == data.floor;
      } else if (!data.type && !data.floor) {
        return rooms;
      } else {
        return room.room_type === data.type || room.floor == data.floor;
      }
    });

    setFilteredRooms(filteredRooms);
  }

  const numberDayWeek = [6, 0, 1, 2, 3, 4, 5];
  const day = new Date().getDay();

  let fieldDay = `day_${numberDayWeek[day]}`;

  const hours = [
    { start: '07:10:00', end: '08:00:00' },
    { start: '08:00:00', end: '08:50:00' },
    { start: '09:00:00', end: '09:50:00' },
    { start: '09:50:00', end: '10:40:00' },
    { start: '10:50:00', end: '11:40:00' },
    { start: '11:40:00', end: '12:30:00' },

    { start: '13:10:00', end: '14:00:00' },
    { start: '14:00:00', end: '14:50:00' },
    { start: '15:00:00', end: '15:50:00' },
    { start: '15:50:00', end: '16:40:00' },
    { start: '16:50:00', end: '17:40:00' },
    { start: '17:40:00', end: '18:30:00' },

    { start: '19:10:00', end: '20:00:00' },
    { start: '20:00:00', end: '20:50:00' },
    { start: '21:00:00', end: '21:50:00' },
    { start: '21:50:00', end: '22:40:00' }
  ];

  let format = 'hh:mm:ss';
  const [fieldInterval, setFieldInterval] = useState('');

  const [dayStart, setDayStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [dayEnd, setDayEnd] = useState(() =>
      endOfWeek(new Date(), { weekStartsOn: 1 })
  );

  useEffect(() => {
    hours.filter((hour, index) => {
      // var time = moment() gives you current time. no format required.
      let time = moment(),
        beforeTime = moment(hour.start, format),
        afterTime = moment(hour.end, format);

      if (time.isBetween(beforeTime, afterTime)) {
        setFieldInterval(index);
      } else {
        return;
      }
    });
  }, []);

  async function getRooms() {
    try {
      const rooms = await api.get('/rooms/map', {
        params: {
          interval: fieldInterval,
          day: fieldDay,
          week: `${formatDate(dayStart)} à ${formatDate(dayEnd)}`
        }
      });

      setRooms(rooms.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, [fieldInterval]);

  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className="filters">
              <Select
                name="type"
                icon={MdOutlineMeetingRoom}
                iconSize={23}
                placeholder="Tipo de espaço"
              >
                <option selected disabled></option>
                <option value="Sala">Sala</option>
                <option value="Laboratório">Laboratório</option>
                <option value="Auditório">Auditório</option>
                <option value="Gabinete">Gabinete</option>
              </Select>

              <Select
                name="floor"
                icon={MdOutlineStairs}
                iconSize={23}
                placeholder="Andar"
              >
                <option selected disabled></option>
                <option value={1}>1° andar</option>
                <option value={2}>2° andar</option>
              </Select>

              <Button text="Filtrar" />
            </div>
          </Form>

          <h2>Ocupação atual dos espaços:</h2>

          {/* {rooms && (
            <div className="cards">
              {filteredRooms
                ? filteredRooms.map((room) => {
                    return <RoomCard room={room} />;
                  })
                : rooms?.map((room) => {
                    return <RoomCard room={room} />;
                  })}
            </div>
          )} */}

          {rooms && (
            <div className="cards">
              {filteredRooms
                ? filteredRooms.map((room) => {
                    return (
                      <div className="card">
                        <div className="card-main">
                          <div className="room-title">
                            <h2>
                              {room[fieldDay]
                                ? `${room.room_type} ${room.room_number} - RESERVADO`
                                : `${room.room_type} ${room.room_number} - DISPONÍVEL`}
                            </h2>
                          </div>

                          <div
                            className="room-info"
                            id={room[fieldDay] ? 'unavailable' : 'available'}
                          >
                            <div className="info">
                              <div>
                                <MdOutlinePerson />
                                <span>Ocupação:</span>
                                <p>
                                  {room[fieldDay]
                                    ? `${room[fieldDay]}`
                                    : 'Disponível'}
                                </p>
                              </div>

                              <div>
                                <MdOutlineBadge />
                                <span>Andar:</span>
                                <p>{`${room.floor}° andar`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : rooms?.map((room) => {
                    return (
                      <div className="card">
                        <div className="card-main">
                          <div className="room-title">
                            <h2>
                              {room[fieldDay]
                                ? `${room.room_type} ${room.room_number} - RESERVADO`
                                : `${room.room_type} ${room.room_number} - DISPONÍVEL`}
                            </h2>
                          </div>

                          <div
                            className="room-info"
                            id={room[fieldDay] ? 'unavailable' : 'available'}
                          >
                            <div className="info">
                              <div>
                                <MdOutlinePerson />
                                <span>Ocupação:</span>
                                <p>
                                  {room[fieldDay]
                                    ? `${room[fieldDay]}`
                                    : 'Disponível'}
                                </p>
                              </div>

                              <div>
                                <MdOutlineBadge />
                                <span>Andar:</span>
                                <p>{`${room.floor}° andar`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </Content>
      </div>
    </>
  );
};

export default RoomsMap;
