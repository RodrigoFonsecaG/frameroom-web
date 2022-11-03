import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Select from '../../components/Select';
import {
  MdOutlineStairs,
  MdOutlineMeetingRoom,
  MdOutlineDriveFileRenameOutline,
  MdOutlineEditCalendar
} from 'react-icons/md';
import { Content } from './styles';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

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

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomProps[]>();
  const imagePath = 'http://localhost:3333/files/';

  function handleSubmit(data: object): void {
    console.log(data);
  }

  async function getRooms() {
    try {
      const rooms = await api.get('/rooms');

      setRooms(rooms.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  // Informações do usuario
  const { user, signOut } = useAuth();

  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <Form onSubmit={handleSubmit}>
            <div className="filters">
              <Select
                name="type"
                icon={MdOutlineMeetingRoom}
                iconSize={23}
                placeholder="Tipo de espaço"
              >
                <option value="Sala">Sala</option>
                <option value="Laboratório">Laboratório</option>
                <option value="Auditório">Auditório</option>
                <option value="Gabinete">Gabinete</option>
              </Select>

              <Select
                name="andar"
                icon={MdOutlineStairs}
                iconSize={23}
                placeholder="Andar"
              >
                <option value={1}>1°</option>
                <option value={2}>2°</option>
              </Select>
            </div>

            {user.isAdmin && (
              <Link to="/create-room">
                <Button text="Cadastrar espaço" />
              </Link>
            )}
          </Form>

          <div className="cards">
            {rooms &&
              rooms.map((room) => {
                return (
                  <div className="card" key={room.room_code}>
                    <img src={imagePath + room.image} alt="" />

                    <div className="room-title">
                      <h2>
                        {room.room_type} {room.room_number}
                      </h2>
                      {user.isAdmin && (
                        <div className='admin-commands'>
                          <Link to={`/rooms/${room.room_code}/edit`}>
                            <MdOutlineDriveFileRenameOutline size={22} />
                          </Link>

                          <Link to={`/schedules/${room.room_code}`}>
                            <MdOutlineEditCalendar size={22} />
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="room-info">
                      <div className="info">
                        <div>
                          <span>Andar:</span>
                          <p>{room.floor}</p>
                        </div>

                        <div>
                          <span>Capacidade:</span>
                          <p>{room.capacity}</p>
                        </div>
                      </div>

                      <Link to={`/rooms/${room.room_code}`}>
                        <Button text="Visualizar" />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </Content>
      </div>
    </>
  );
};

export default Rooms;
