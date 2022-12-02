import React, { useEffect, useRef, useState } from 'react';
import {
  MdOutlineCalendarToday,
  MdOutlineHouse,
  MdOutlinePin,
  MdOutlineReduceCapacity,
  MdOutlineStairs,
  MdOutlineTimer,
  MdOutlineTimerOff
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
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { schemaCreateOrder, schemaCreateRoom } from '../../schemas/schemas';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErros';
import * as Yup from 'yup';
import { OptionsFactory } from 'ag-grid-community/dist/lib/filter/provided/optionsFactory';
import { isEqual, parseISO, format, parse } from 'date-fns';

import {
  useDisclosure,
} from '@chakra-ui/react';
import SchedulesModal from './SchedulesModal';



const CreateOrder = (props) => {
  const { token, user } = useAuth();
  const imageInput = useRef();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();



  const location = useLocation();
  console.log(location.state);


  async function handleSubmit(data: object): Promise<void> {
    formRef.current?.setErrors({});
    try {
      const order = {
        ...data,
        user_cpf: user.cpf
      };

      await schemaCreateOrder.validate(data, {
        abortEarly: false
      });

      await api.post('/orders', order, {
        headers: { Authorization: `Bearer ${token}` }
      });

      addToast({
        type: 'sucess',
        title: 'Solicitação de reserva realizada com sucesso!',
        description: 'Sua solicitação de reserva será analisada e respondida por e-mail'
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
        title: 'Erro na solicitação de reserva',
        description:
          'Ocorreu um erro ao na solicitação de reserva do espaço, tente novamente.'
      });
    }
  }

  const [rooms, setRooms] = useState<RoomProps>();

  async function getRooms() {
    const rooms = await api.get(`rooms`);

    setRooms(rooms.data);
  }

  useEffect(() => {
    getRooms();
  }, []);

  const timeOptions = [
    {
      value: '07:10',
      label: '07h10'
    },
    {
      value: '08:00',
      label: '08h00'
    },
    {
      value: '08:50',
      label: '08h50'
    },
    {
      value: '09:00',
      label: '09h00'
    },
    {
      value: '09:50',
      label: '09h50'
    },
    {
      value: '10:40',
      label: '10h40'
    },
    {
      value: '10:50',
      label: '10h50'
    },
    {
      value: '11:40',
      label: '11h40'
    },
    {
      value: '12:30',
      label: '12h30'
    },
    {
      value: '13:10',
      label: '13h10'
    },
    {
      value: '14:00',
      label: '14h00'
    },
    {
      value: '14:50',
      label: '14h50'
    },
    {
      value: '15:00',
      label: '15h00'
    },
    {
      value: '15:50',
      label: '15h50'
    },
    {
      value: '16:40',
      label: '16h40'
    },
    {
      value: '16:50',
      label: '16h50'
    },
    {
      value: '17:40',
      label: '17h40'
    },
    {
      value: '18:30',
      label: '18h30'
    },
    {
      value: '19:10',
      label: '19h10'
    },
    {
      value: '20:00',
      label: '20h00'
    },
    {
      value: '20:50',
      label: '20h50'
    },
    {
      value: '21:00',
      label: '21h00'
    },
    {
      value: '21:50',
      label: '21h50'
    },
    {
      value: '22:40',
      label: '22h40'
    }
  ];

  const [timeEndOptions, setTimeEndOptions] = useState([]);
  const [timeEndDisabled, setTimeEndDisabled] = useState(true);

  function handleTimeEnd(data) {
    const selectedTime = parseInt(data.target.value.replace(':', ''));

    const filteredTimes = timeOptions.filter((time, index) => {
      if (selectedTime < parseInt(time.value.replace(':', ''))) {
        return { value: time.value, label: time.label };
      }
    });

    setTimeEndDisabled(false);

    setTimeEndOptions(filteredTimes);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <section className="room-section">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="room-infos">
                <div className="room-header">
                  <h2>Solicitação de reserva</h2>
                </div>

                <div className="content">
                  <h3>
                    Dados do espaço{' '}
                    <p>
                      (Consulte a disponibilidade dos horários desse espaço
                      antes de solicitar)
                    </p>
                  </h3>

                  <Divider />

                  <div className="room-inputs">
                    <Select
                      defaultValue={location.state ? location.state : null}
                      name="room_code"
                      icon={MdOutlineHouse}
                      iconSize={23}
                      placeholder="Espaço *"
                      disabled
                    >
                      {rooms &&
                        rooms.map((room) => (
                          <option
                            value={room.room_code}
                            selected={room.room_code == location.state}
                          >{`${room.room_type} ${room.room_number}`}</option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="content">
                  <h3>Contato</h3>

                  <Divider />

                  <div className="room-textarea">
                    <Textarea
                      text="Motivo *"
                      name="message"
                      placeholder="Descreva aqui o motivo para da solicitação de reserva de espaço"
                    />
                  </div>
                </div>
                <div className="content">
                  <div className='date-hour'>
                    <h3>Data e horário</h3>
                    <Button
                      className='alt'
                      type="button"
                      text="Ver horários"
                      onClick={onOpen}
                    />
                  </div>
                  <Divider />

                  <div className="room-inputs date-inputs">
                    <Input
                      name="date"
                      icon={MdOutlineCalendarToday}
                      iconSize={23}
                      topText="Data *"
                      type="date"
                    />

                    <Select
                      name="hour_start"
                      icon={MdOutlineTimer}
                      iconSize={23}
                      placeholder="Horário de início *"
                      onChange={handleTimeEnd}
                    >
                      <option selected disabled>
                        Selecione um horário
                      </option>
                      {timeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>

                    <Select
                      name="hour_end"
                      icon={MdOutlineTimerOff}
                      iconSize={23}
                      placeholder="Horário final *"
                      disabled={timeEndDisabled}
                    >
                      <option selected disabled>
                        Selecione um horário
                      </option>
                      {timeEndOptions &&
                        timeEndOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
              </div>

              <Button type="submit" text="Solicitar espaço" />
            </Form>
          </section>
        </Content>

        <SchedulesModal
          roomCode={location.state}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default CreateOrder;
