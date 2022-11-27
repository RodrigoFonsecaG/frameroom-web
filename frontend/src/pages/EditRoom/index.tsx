import React, { useState, useEffect, useRef } from 'react';
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
import { FormHandles } from '@unform/core';
import { useToast } from '../../context/ToastContext';
import { schemaEditRoom, schemaRoom } from '../../schemas/schemas';
import getValidationErrors from '../../utils/getValidationErros';
import * as Yup from 'yup';

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

const EditRoom = () => {
  const [room, setRoom] = useState<RoomProps>({});
  const { token } = useAuth();
  const navigate = useNavigate();
  let { room_code } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  async function handleSubmit(data: object): Promise<void> {
    formRef.current?.setErrors({});
    try {
      const {
        room_code,
        image,
        room_type,
        room_number,
        capacity,
        floor,
        description,
        availability
      } = data;

      await schemaEditRoom.validate(data, {
        abortEarly: false
      });

      const formData = new FormData();
      formData.append('image', image);
      formData.append('room_code', room.room_code);
      formData.append('room_type', room_type);
      formData.append('room_number', room_number);
      formData.append('capacity', capacity);
      formData.append('floor', floor);
      formData.append('description', description);
      formData.append('availability', availability);

      await api.put('/rooms', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      addToast({
        type: 'sucess',
        title: 'Espaço editado com sucesso!',
        description: 'As informações sobre o espaço foram atualizadas.'
      });

      navigate('/rooms');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na edição de espaço',
        description: 'Ocorreu um erro ao editar o espaço, tente novamente.'
      });
    }
  }

  async function handleDelete() {
    const alert = confirm('Tem certeza que deseja deletar esse espaço?');
    if (alert) {
      try {
        await api.delete(`/rooms/${room_code}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        addToast({
          type: 'sucess',
          title: 'Espaço deletado com sucesso!',
          description: 'As informações sobre o espaço foramdeletadas.'
        });

        navigate('/rooms');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na edição de espaço',
          description: 'Ocorreu um erro ao editar o espaço, tente novamente.'
        });
      }
    }

    return;
  }

  async function getRoom() {
    const rooms = await api.get(`rooms/${room_code}`);

    console.log(rooms);

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
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="room-infos">
                  <div className="room-header">
                    <h2>
                      Editando {room.room_type} {room.room_number}
                    </h2>
                  </div>

                  <Divider />

                  <div className="room-inputs">
                    <Select
                      name="room_type"
                      icon={MdOutlineHouse}
                      iconSize={23}
                      placeholder="Tipo do espaço *"
                      defaultValue={room.room_type}
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
                      topText="Número de identificação *"
                      defaultValue={room.room_number}
                    />
                  </div>

                  <div className="room-inputs">
                    <Select
                      name="floor"
                      icon={MdOutlineStairs}
                      iconSize={23}
                      placeholder="Andar *"
                      defaultValue={room.floor}
                    >
                      <option value={1}>1° andar</option>
                      <option value={2}>2° andar</option>
                    </Select>

                    <Input
                      name="capacity"
                      icon={MdOutlineReduceCapacity}
                      iconSize={23}
                      topText="Quantidade de assentos *"
                      defaultValue={room.capacity}
                    />
                  </div>

                  <div className="room-inputs">
                    <Select
                      name="availability"
                      icon={MdOutlineStairs}
                      iconSize={23}
                      placeholder="Disponibilidade *"
                      defaultValue={room.availability}
                    >
                      <option value={1}>Disponível</option>
                      <option value={2}>Indisponível</option>
                      <option value={3}>Em manutenção</option>
                    </Select>

                    <ImageInput name="image" />
                  </div>

                  <div className="room-textarea">
                    <Textarea
                      text="Descrição *"
                      name="description"
                      defaultValue={room.description}
                    />
                  </div>
                </div>

                <div className="buttons">
                  <Button type="submit" text="Editar espaço" />
                  <Button
                    className="delete"
                    type="button"
                    text="Deletar espaço"
                    onClick={handleDelete}
                  />
                </div>
              </Form>
            </section>
          </Content>
        )}
      </div>
    </>
  );
};

export default EditRoom;
