import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Content, Divider } from './styles';
import api from '../../services/api';
import { useLocation, useParams } from 'react-router-dom';
import Tables from '../../components/Tables';

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

const Schedules = () => {
  const [room, setRoom] = useState<RoomProps>({});
  let { room_code } = useParams();
  const { state } = useLocation();

  if (state) {
    console.log(state);
  }

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
              <div className="room-infos">
                <div className="room-header">
                  <h2>
                    Horários ({room.room_type} {room.room_number})
                  </h2>
                </div>

                <p>
                  OBS: Horários não fixos devem ser escritos em caixa alta
                  obrigatoriamente como: RESERVADO ou RECESSO
                </p>

                <Divider />

                <Tables
                  room_code={room_code}
                  state={state ? state.intervals : false}
                  stateDay={state ? state.day : false}
                  editable
                />
              </div>
            </section>
          </Content>
        )}
      </div>
    </>
  );
};

export default Schedules;
