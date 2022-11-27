import React, { useState, useEffect } from 'react';
import {
  MdOutlineHouse,
  MdOutlinePin,
  MdOutlineReduceCapacity,
  MdOutlineStairs
} from 'react-icons/md';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { Content, Divider } from './styles';
import { Form } from '@unform/web';
import ImageInput from '../../components/ImageInput';
import Input from '../../components/Input';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [schedules, setSchedules] = useState<RoomProps>({});
  let { room_code } = useParams();

  async function getRoom() {
    const rooms = await api.get(`/rooms/${room_code}`);

    setRoom(rooms.data[0]);
  }

  async function getRoomSchedules() {
    const schedules = await api.get(`/schedules/${room_code}`);

    setSchedules(schedules.data);
  }

  useEffect(() => {
    getRoom();
    getRoomSchedules();
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

                <Divider />

                <Tables data={schedules} room_code={room_code} editable/>
              </div>
            </section>
          </Content>
        )}
      </div>
    </>
  );
};

export default Schedules;
