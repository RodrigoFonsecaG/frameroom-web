import React, { useRef } from 'react';
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
import Input from '../../components/Input';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ImageInput from '../../components/ImageInput';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const { token } = useAuth();
  const imageInput = useRef();
  const navigate = useNavigate();

  async function handleSubmit(data: object): Promise<void> {
    const {
      image,
      room_type,
      room_number,
      capacity,
      floor,
      description,
      availability
    } = data;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('room_type', room_type);
    formData.append('room_number', room_number);
    formData.append('capacity', capacity);
    formData.append('floor', floor);
    formData.append('description', description);
    formData.append('availability', availability);

    try {
      await api.post('/rooms', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/rooms');
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <section className="room-section">
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="room-infos">
                <div className="room-header">
                  <h2>Cadastrar espaço</h2>
                </div>

                <Divider />

                <div className="room-inputs">
                  <Select
                    name="room_type"
                    icon={MdOutlineHouse}
                    iconSize={23}
                    placeholder="Tipo do espaço *"
                  >
                    <option value="Sala">Sala</option>
                    <option value="Laboratório">Laboratório</option>
                    <option value="Auditório">Auditório</option>
                    <option value="Gabinete">Gabinete</option>
                  </Select>

                  <Input
                    name="room_number"
                    icon={MdOutlinePin}
                    iconSize={23}
                    topText="Número *"
                  />
                </div>

                <div className="room-inputs">
                  <Select
                    name="floor"
                    icon={MdOutlineStairs}
                    iconSize={23}
                    placeholder="Andar *"
                  >
                    <option value={1}>1°</option>
                    <option value={2}>2°</option>
                  </Select>

                  <Input
                    name="capacity"
                    icon={MdOutlineReduceCapacity}
                    iconSize={23}
                    topText="Capacidade *"
                  />
                </div>

                <div className="room-inputs">
                  <Select
                    name="availability"
                    icon={MdOutlineStairs}
                    iconSize={23}
                    placeholder="Disponibilidade *"
                  >
                    <option value={1}>Disponível</option>
                    <option value={2}>Indisponível</option>
                    <option value={3}>Em manutenção</option>
                  </Select>

                  <ImageInput name="image" />

                </div>

                <div className="room-textarea">
                  <Textarea text="Descrição" name="description" />
                </div>
              </div>

              <Button type="submit" text="Cadastrar espaço" />
            </Form>
          </section>
        </Content>
      </div>
    </>
  );
};

export default CreateRoom;
