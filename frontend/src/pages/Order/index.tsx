import React, { useState, useEffect } from 'react';
import {
  MdOutlineCalendarToday,
  MdOutlineGroup,
  MdOutlineMail,
  MdOutlinePerson,
  MdOutlinePhone,
  MdOutlineTimer
} from 'react-icons/md';
import Header from '../../components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import Textarea from '../../components/Textarea';
import { Content, Divider } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatTime } from '../../utils/convertDates';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input as ChackraInput,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Textarea as ChackraTextarea
} from '@chakra-ui/react';

const Order = () => {
  const [order, setOrder] = useState({});
  let { order_code } = useParams();
  const { token } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

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
                    <h2>Data e horário</h2>
                  </div>

                  <Divider />

                  <div className="room-inputs">
                    <Input
                      disabled
                      name="date"
                      icon={MdOutlineCalendarToday}
                      iconSize={23}
                      topText="Data"
                      defaultValue={formatDate(order.date)}
                    />

                    <Input
                      disabled
                      name="hour"
                      icon={MdOutlineTimer}
                      iconSize={23}
                      topText="Horário"
                      defaultValue={`${formatTime(
                        order.hour_start
                      )} ás ${formatTime(order.hour_end)}`}
                    />
                  </div>
                </div>

                <div className="buttons">
                  <Button
                    type="button"
                    text="Entrar em contato"
                    onClick={onOpen}
                  />
                  <Button text="Aprovar" />
                  <Button text="Rejeitar" className="delete" />
                </div>
              </Form>
            </section>
          </Content>
        )}
      </div>

      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
          <ModalContent padding={10}>
            <ModalHeader fontSize="4xl" style={{ fontWeight: 'bold' }}>
              {`Entrar em contato com ${order.name}`}
            </ModalHeader>
            <ModalCloseButton size="lg" />
            <ModalBody>
              <div>
                <h3 style={{ fontWeight: 'bold' }}>E-mail do remetente</h3>
                <ChackraInput
                  placeholder="teste"
                  size="lg"
                  minHeight={20}
                  fontSize={16}
                  value={order.email}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <h3 style={{ fontWeight: 'bold' }}>Mensagem</h3>
                <ChackraTextarea
                  placeholder="Digite a mensagem para o remetente"
                  size="lg"
                  minHeight={200}
                  fontSize={16}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                text="Enviar por e-mail"
                onClick={onClose}
                className="modal-button"
                style={{ margin: '2rem auto 0 auto' }}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
};

export default Order;
