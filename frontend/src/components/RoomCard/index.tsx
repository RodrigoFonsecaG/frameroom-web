import React from 'react';
import { MdOutlineDriveFileRenameOutline, MdOutlineEditCalendar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import { Content } from './styles';

const RoomCard = ({ room }) => {
    const { user, signOut } = useAuth();
      const imagePath = 'http://localhost:3333/files/';

  return (
    <Content className="card" key={room.room_code}>
      <img src={imagePath + room.image} alt="" />

      <div className="card-main">
        <div className="room-title">
          <h2>
            {room.room_type} {room.room_number}
          </h2>
          {user.isAdmin && (
            <div className="admin-commands">
              <Link to={`/rooms/${room.room_code}/edit`}>
                <div>
                  <MdOutlineDriveFileRenameOutline size={22} />
                  Editar espaço
                </div>
              </Link>

              <Link to={`/schedules/${room.room_code}`}>
                <div>
                  <MdOutlineEditCalendar size={22} />
                  Editar horários
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className="room-info">
          <div className="info">
            <div>
              <span>Andar:</span>
              <p>{`${room.floor}° andar`}</p>
            </div>

            <div>
              <span>Capacidade:</span>
              <p>{`${room.capacity} assentos`}</p>
            </div>
          </div>

          <Link to={`/rooms/${room.room_code}`}>
            <Button text="Visualizar" />
          </Link>
        </div>
      </div>
    </Content>
  );
};

export default RoomCard;
