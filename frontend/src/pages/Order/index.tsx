import React, { useState, useEffect } from 'react';
import {
  MdOutlineHouse,
  MdOutlinePin,
  MdOutlineReduceCapacity,
  MdOutlineStairs
} from 'react-icons/md';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { Content, Divider } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';
import { Link, useParams } from 'react-router-dom';
import Tables from '../../components/Tables';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatTime } from '../../utils/convertDates';

const Order = () => {
  const [order, setOrder] = useState({});
  let { order_code } = useParams();
    const { token } = useAuth();
    

  async function getOrder() {
    const rooms = await api.get(`/orders/${order_code}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setOrder(rooms.data[0]);
  }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {order.order_code && (
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
                      icon={MdOutlinePin}
                      iconSize={23}
                      topText="Solicitante"
                      defaultValue={order.name}
                    />

                    <Input
                      disabled
                      name="user_type"
                      icon={MdOutlinePin}
                      iconSize={23}
                      topText="Cargo"
                      defaultValue={order.type}
                    />
                  </div>

                  <div className="room-inputs">
                    <Input
                      disabled
                      name="email"
                      icon={MdOutlineReduceCapacity}
                      iconSize={23}
                      topText="E-mail"
                      defaultValue={order.email}
                    />

                    <Input
                      disabled
                      name="phone"
                      icon={MdOutlineReduceCapacity}
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
                    <h2>Data e horário</h2>
                  </div>

                  <Divider />

                  <div className="room-inputs">
                    <Input
                      disabled
                      name="date"
                      icon={MdOutlinePin}
                      iconSize={23}
                      topText="Data"
                      defaultValue={formatDate(order.date)}
                    />

                    <Input
                      disabled
                      name="hour"
                      icon={MdOutlinePin}
                      iconSize={23}
                      topText="Horário"
                      defaultValue={`${formatTime(
                        order.hour_start
                      )} ás ${formatTime(order.hour_end)}`}
                    />
                  </div>
                </div>

                <div className="buttons">
                  <Button text="Entrar em contato" />
                  <Button text="Aprovar" />
                  <Button text="Rejeitar" className='delete'/>
                </div>
              </Form>
            </section>
          </Content>
        )}
      </div>
    </>
  );
};

export default Order;
