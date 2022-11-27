import React, { useRef } from 'react';
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
  Textarea as ChackraTextarea
} from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { formatDate, formatTime } from '../../../utils/convertDates';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const ContactModal = ({ order, isOpen, onClose }) => {
  const [message, setMessage] = React.useState('');
  const handleChange = (event) => setMessage(event.target.value);
  const { token } = useAuth();
  const { addToast } = useToast();
    const navigate = useNavigate();

  async function contactOrder() {
    console.log(message);

    try {
      const state = 'contact';

      await api.put(
        `/orders/${order.order_code}`,
        {
          order: {
            ...order,
            date: formatDate(order.date),
            hour: `${formatTime(order.hour_start)} ás ${formatTime(
              order.hour_end
            )}`,
            contact: message
          },
          state
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      addToast({
        type: 'sucess',
        title: 'E-mail enviado com sucesso!',
        description:
          'O e-mail com sua mensagem de contato foi enviado ao solicitante.'
      });

      navigate(`/orders`);
    } catch (err) {
      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro ao entrar em contato',
        description:
          'Ocorreu um erro ao enviar um e-mail ao solicitante, tente novamente.'
      });
    }

    return;
  }

  return (
    <>
      {order && (
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
                    placeholder="E-mail"
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
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  text="Enviar por e-mail"
                  className="modal-button"
                  onClick={contactOrder}
                  style={{ margin: '2rem auto 0 auto' }}
                />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      )}
    </>
  );
};

export default ContactModal;
