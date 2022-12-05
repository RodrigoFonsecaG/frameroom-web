import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Select from '../../components/Select';
import {
  MdOutlineStairs,
  MdOutlineMeetingRoom,
  MdOutlineDriveFileRenameOutline,
  MdOutlineEditCalendar,
  MdOutlineVerifiedUser,
  MdOutlinePerson,
  MdOutlineTimer,
  MdOutlineCalendarToday,
  MdOutlineBadge
} from 'react-icons/md';
import { Content } from './styles';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  formatDate,
  formatTime,
  convertIntervalTime,
  convertIntervalDate
} from '../../utils/convertDates';

const Orders = () => {
  const [orders, setOrders] = useState();

  const { token } = useAuth();

  async function getOrders() {
    try {
      const orders = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(orders.data);
    } catch (error) {
      console.log(error);
    }
  }

  function filterByDate() {
    const filteredOrders = orders.slice(0).sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    setOrders(filteredOrders);
  }

  function filterByUserType() {
    const filteredOrders = orders.slice(0).sort(function (a, b) {
      return a.type_code - b.type_code;
    });
    setOrders(filteredOrders);
  }

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <div className="filters-container">
            <div className="filters">
              <Button
                text="Filtrar por cargo"
                onClick={filterByUserType}
              ></Button>
              <Button text="Filtrar por data" onClick={filterByDate}></Button>
            </div>
          </div>

          <div className="cards">
            {orders &&
              orders.map((order) => {
                return (
                  <div className="card" key={order.order_code}>
                    <div className="card-main">
                      <div className="room-title">
                        <h2>{`Solicitação: ${order.room_type} ${order.room_number}`}</h2>
                      </div>

                      <div className="room-info">
                        <div className="info">
                          <div>
                            <MdOutlinePerson />
                            <span>Solicitante:</span>
                            <p>{order.name}</p>
                          </div>

                          <div>
                            <MdOutlineBadge />
                            <span>Cargo:</span>
                            <p>{order.type}</p>
                          </div>

                          <div className="dates">
                            <div className="dates-header">
                              <MdOutlineCalendarToday />
                              <span>Datas: </span>
                            </div>
                            <div className="intervals">
                              {order.intervals.map((interval) => {
                                return (
                                  <div className="interval">
                                    <p>{convertIntervalDate(interval.day)} -</p>
                                    <p>
                                      {convertIntervalTime(interval.interval)}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="order-button">
                          <Link to={`/orders/${order.order_code}`}>
                            <Button text="Visualizar" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Content>

        
      </div>
    </>
  );
};

export default Orders;
