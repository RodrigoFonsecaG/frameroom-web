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

const ContactModal = ({ order, isOpen, onClose }) => {
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
      )}
    </>
  );
};

export default ContactModal;
