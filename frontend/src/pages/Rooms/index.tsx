import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import Select from '../../components/Select';
import { MdOutlineStairs, MdOutlineMeetingRoom } from 'react-icons/md';
import { Content } from './styles';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import RoomCard from '../../components/RoomCard';
import { FormHandles } from '@unform/core';

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
  const [filteredRooms, setFilteredRooms] = useState<RoomProps[]>();
  const formRef = useRef<FormHandles>(null);

  console.log(typeof(rooms))

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

  async function getRooms() {
    try {
      const rooms = await api.get('/rooms', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET',
          'ngrok-skip-browser-warning': 'any'
        }
      });

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

            {user.isAdmin && (
              <Link to="/create-room">
                <Button text="Cadastrar espaço" />
              </Link>
            )}
          </Form>

          {rooms && (
            <div className="cards">
              {filteredRooms
                ? filteredRooms.map((room) => {
                    return <RoomCard room={room} />;
                  })
                : rooms?.map((room) => {
                    return <RoomCard room={room} />;
                  })}
            </div>
          )}
        </Content>
      </div>
    </>
  );
};

export default Rooms;
