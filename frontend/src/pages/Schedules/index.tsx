import React, { useState, useEffect } from 'react';
import {
  MdOutlineArrowBack,
  MdOutlineArrowForward,
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Tables from '../../components/Tables';
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
