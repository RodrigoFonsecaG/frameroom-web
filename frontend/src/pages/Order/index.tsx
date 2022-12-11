import React, { useState, useEffect, useRef } from 'react';
import {
  MdOutlineCalendarToday,
  MdOutlineGroup,
  MdOutlineMail,
  MdOutlineNextWeek,
  MdOutlinePerson,
  MdOutlinePhone,
  MdOutlineTimer,
  MdOutlineWeekend
} from 'react-icons/md';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { Content, Divider } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import {
  convertIntervalDate,
  convertIntervalTime,
  formatDate,
  getWeek
} from '../../utils/convertDates';
import ContactModal from './ContactModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { FormHandles } from '@unform/core';

import { useDisclosure } from '@chakra-ui/react';
import SchedulesModal from './SchedulesModal';

const Order = () => {
  const [order, setOrder] = useState();
  let { order_code } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  async function getOrder() {
    const order = await api.get(`/orders/${order_code}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setOrder(order.data[0]);
  }

  useEffect(() => {
    getOrder();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2
  } = useDisclosure();

  function deleteSchedule(data) {
    let day = data.target.dataset.day;
    let intervalDate = data.target.dataset.interval;

    if (order.intervals.length < 2) {
      alert('Não é possivel deletar todos os horários');
      return;
    } else {
      let filteredIntervals = order.intervals.filter((interval) => {
        if (interval.interval != intervalDate) {
          if (interval.dateDay == day) {
            return interval;
          }
          if (interval.dateDay != day) {
            return interval;
          }
        } else if (interval.interval == intervalDate) {
          if (interval.dateDay != day) {
            return interval;
          }
          if (interval.dateDay == day) {
            data.target.parentElement.remove();
            return false;
          }
        }
      });

      order.intervals = filteredIntervals;
    }

    console.log(order.intervals.length);
  }



  async function approveOrder() {
    try {
      const state = 'approve';

      const filteredIntervals = order?.intervals.map((interval) => {
        return {
          ...interval,
          day: convertIntervalDate(interval.day),
          interval: convertIntervalTime(interval.interval)
        };
      });

      await api.put(
        `/orders/${order_code}`,
        {
          order: {
            ...order,
            date: getWeek(order.date),
            intervals: filteredIntervals
          },
          state
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      addToast({
        type: 'sucess',
        title: 'Solicitação aprovada com sucesso!',
        description: `Um e-mail foi encaminhado ao solicitante informando que sua solicitação foi aprovada`
      });

      addToast({
        type: 'info',
        title: 'Horários adicionados na tabela!',
        description: `Após conferir, clique em salvar horários para validar a reserva.`
      });

      navigate(`/schedules/${order.room_code}`, { state: order.intervals });
    } catch (err) {
      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na aprovação',
        description:
          'Ocorreu um erro ao aprovar a solicitação, tente novamente.'
      });
    }

    return;
  }

  async function rejectOrder() {
    try {
      const state = 'reject';

            const filteredIntervals = order?.intervals.map((interval) => {
              return {
                ...interval,
                day: convertIntervalDate(interval.day),
                interval: convertIntervalTime(interval.interval)
              };
            });

     
      await api.put(
        `/orders/${order_code}`,
        {
          order: {
            ...order,
            date: getWeek(order.date),
            intervals: filteredIntervals
          },
          state
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      addToast({
        type: 'sucess',
        title: 'Solicitação de reserva rejeitada com sucesso!',
        description:
          'Um e-mail foi enviado ao solicitante informando que sua reserva foi rejeitada!'
      });

      navigate(`/orders`);
    } catch (err) {
      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na rejeição',
        description:
          'Ocorreu um erro ao rejeitar a solicitação, tente novamente.'
      });
    }

    return;
  }

  return (
    <>
      <Header />
      <div className="container">
        {order && (
          <Content>
            <section className="room-section">
              <Form>
                <div className="room-infos">
                  <div className="room-header">
                    <h2>
                      Solicitação de reserva ({order.room_type}{' '}
                      {order.room_number})
                    </h2>
                  </div>

                  <Divider />

                  <div className="room-inputs">
                    <Input
                      disabled
                      name="name"
                      icon={MdOutlinePerson}
                      iconSize={23}
                      topText="Solicitante"
                      defaultValue={order.name}
                    />

                    <Input
                      disabled
                      name="user_type"
                      icon={MdOutlineGroup}
                      iconSize={23}
                      topText="Cargo"
                      defaultValue={order.type}
                    />
                  </div>

                  <div className="room-inputs">
                    <Input
                      disabled
                      name="email"
                      icon={MdOutlineMail}
                      iconSize={23}
                      topText="E-mail"
                      defaultValue={order.email}
                    />

                    <Input
                      disabled
                      name="phone"
                      icon={MdOutlinePhone}
                      iconSize={23}
                      topText="Telefone"
                      defaultValue={order.phone}
                    />
                  </div>

                  <div className="room-textarea">
                    <Textarea
                      disabled
                      text="Messagem"
                      name="message"
                      value={order.message}
                    />
                  </div>
                </div>

                <div className="room-infos">
                  <div className="room-header">
                    <h2>Datas e horários</h2>
                    <Button
                      className="alt"
                      type="button"
                      text="Ver horários do espaço"
                      onClick={onOpen2}
                    />
                  </div>

                  <Divider />

                  <div className="room-inputs date-inputs">
                    <Input
                      disabled
                      name="week"
                      icon={MdOutlineNextWeek}
                      iconSize={23}
                      topText="Semana"
                      defaultValue={getWeek(order.date)}
                    />
                    {order.intervals.map((interval) => {
                      return (
                        <div
                          className="dates"
                          key={interval.day + interval.interval}
                        >
                          <Input
                            disabled
                            name="date"
                            icon={MdOutlineCalendarToday}
                            iconSize={23}
                            topText="Dia"
                            defaultValue={convertIntervalDate(interval.day)}
                          />

                          <Input
                            disabled
                            name="hour"
                            icon={MdOutlineTimer}
                            iconSize={23}
                            topText="Horário"
                            defaultValue={convertIntervalTime(
                              interval.interval
                            )}
                          />

                          <Button
                            type="button"
                            text="X"
                            onClick={deleteSchedule}
                            data-day={interval.dateDay}
                            data-interval={interval.interval}
                          />
                        </div>
                      );
                    })}
                    {/* <Input
                      disabled
                      name="date"
                      icon={MdOutlineCalendarToday}
                      iconSize={23}
                      topText="Data"
                      defaultValue="19/02/2002"
                    />

                    <Input
                      disabled
                      name="hour"
                      icon={MdOutlineTimer}
                      iconSize={23}
                      topText="Horário"
                      defaultValue="19/02/2002"
                    /> */}
                  </div>
                </div>

                <div className="buttons">
                  <Button
                    type="button"
                    text="Entrar em contato"
                    onClick={onOpen}
                  />
                  <Button
                    text="Aprovar"
                    onClick={approveOrder}
                    className="approve"
                  />
                  <Button
                    text="Rejeitar"
                    onClick={rejectOrder}
                    className="delete"
                  />
                </div>
              </Form>
            </section>
          </Content>
        )}
      </div>

      <ContactModal order={order} isOpen={isOpen} onClose={onClose} />
      {order && (
        <SchedulesModal
          roomCode={order.room_code}
          isOpen={isOpen2}
          onClose={onClose2}
        />
      )}
    </>
  );
};

export default Order;
