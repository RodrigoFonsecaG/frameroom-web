import React, { useState, useEffect } from 'react';
import {
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineHouse,
  MdOutlinePin,
  MdOutlineReduceCapacity,
  MdOutlineStairs
} from 'react-icons/md';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { Content, Divider } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';
import { Link, useParams } from 'react-router-dom';
import Tables from '../../components/Tables';
import Button from '../../components/Button';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
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

const Room = () => {
  const [room, setRoom] = useState<RoomProps>({});
  let { room_code } = useParams();


  async function getRoom() {
    const rooms = await api.get(`/rooms/${room_code}`);

    setRoom(rooms.data[0]);
  }


  useEffect(() => {
    getRoom();
  }, []);


  return (
    <>
      <Header />
      <div className="container">
        {room.room_type && (
          <Content>
            <div className="room-image">
              <img src={room.image_url} alt="" />
            </div>

            <section className="room-section">
              <Form>
                <div className="room-infos">
                  <div className="room-header">
                    <h2>
                      {room.room_type} {room.room_number}
                    </h2>
                    {room.availability === 1 ? (
                      <Link to="/create-order" state={room_code}>
                        <Button text="Reservar este espaço" />
                      </Link>
                    ) : (
                      ''
                    )}
                  </div>

                  <Divider />

                  <div className="room-inputs">
                    <Select
                      disabled
                      name="room_type"
                      icon={MdOutlineHouse}
                      iconSize={23}
                      placeholder="Tipo do espaço"
                      defaultValue={room.room_type}
                    >
                      <option value="Sala">Sala</option>
                      <option value="Laboratório">Laboratório</option>
                      <option value="Auditório">Auditório</option>
                      <option value="Gabinete">Gabinete</option>
                    </Select>

                    <Input
                      disabled
                      name="room_number"
                      icon={MdOutlinePin}
                      iconSize={23}
                      topText="Número de identificação"
                      defaultValue={room.room_number}
                    />
                  </div>

                  <div className="room-inputs">
                    <Select
                      disabled
                      name="floor"
                      icon={MdOutlineStairs}
                      iconSize={23}
                      placeholder="Andar"
                      defaultValue={room.floor}
                    >
                      <option value={1}>1° andar</option>
                      <option value={2}>2 andar°</option>
                    </Select>

                    <Input
                      disabled
                      name="capacity"
                      icon={MdOutlineReduceCapacity}
                      iconSize={23}
                      topText="Quantidade de assentos"
                      defaultValue={`${room.capacity} assentos`}
                    />
                  </div>

                  <div className="room-inputs">
                    <Select
                      disabled
                      name="availability"
                      icon={MdOutlineStairs}
                      iconSize={23}
                      placeholder="Disponibilidade"
                      defaultValue={room.availability}
                    >
                      <option value={1}>Disponível</option>
                      <option value={2}>Indisponível</option>
                      <option value={3}>Em manutenção</option>
                    </Select>
                  </div>

                  <div className="room-textarea">
                    <Textarea
                      disabled
                      text="Descrição"
                      name="description"
                      value={room.description}
                    />
                  </div>
                </div>
              </Form>
            </section>

            <section className="room-section">
              <div className="room-infos">
                <div className="room-header">
                  <h2>Horários</h2>
                </div>

                <Divider />

                <Tables
                  room_code={room_code}
                />
              </div>
            </section>
          </Content>
        )}
      </div>
    </>
  );
};

export default Room;
