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

import { useDisclosure } from '@chakra-ui/react';
import SchedulesModal from './SchedulesModal';
import Tables from '../../components/Tables';

const CreateOrder = (props) => {
  const { token, user } = useAuth();
  const imageInput = useRef();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [intervals, setIntervals] = useState([]);
  const [intervalsError, setIntervalsError] = useState([]);

  const location = useLocation();


  async function handleSubmit(data: object): Promise<void> {
    formRef.current?.setErrors({});



    try {
      const order = {
        ...data,
        intervals,
        user_cpf: user.cpf
      };

      order.date = intervals[0].dateDay;


      await schemaCreateOrder.validate(order, {
        abortEarly: false
      });
      await api.post('/orders', order, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'POST',
          'ngrok-skip-browser-warning': 'any'
        }
      });

      addToast({
        type: 'sucess',
        title: 'Solicitação de reserva realizada com sucesso!',
        description:
          'Sua solicitação de reserva será analisada e respondida por e-mail'
      });

      navigate('/rooms');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        setIntervalsError(errors.intervals);

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

  const [schedules, setSchedules] = useState();

  async function getRoomSchedules() {
    const schedules = await api.get(`/schedules/${location.state}`);

    setSchedules(schedules.data);
  }

  useEffect(() => {
    getRoomSchedules();
  }, []);

  const getTableData = (data) => {
    setIntervals(data)
  }


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
                  <div className="date-hour">
                    <h3>Data e horário</h3>
                  </div>
                  <Divider />

                  {/* <div className="room-inputs date-inputs">
                    <Input
                      name="date"
                      icon={MdOutlineCalendarToday}
                      iconSize={23}
                      topText="Data *"
                      type="date"
                    />
                  </div> */}
                  <label>Selecione os horários *</label>
                  {schedules && (
                    <Tables
                      data={schedules}
                      selectable
                      room_code={location.state}
                      onTableChange={getTableData}
                      error={intervalsError}
                    />
                  )}
                </div>
              </div>

              <Button type="submit" text="Solicitar espaço" />
            </Form>
          </section>
        </Content>
      </div>
    </>
  );
};

export default CreateOrder;
