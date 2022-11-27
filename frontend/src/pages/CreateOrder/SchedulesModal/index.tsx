import React, { useEffect, useRef, useState } from 'react';
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
import Tables from '../../../components/Tables';
import api from '../../../services/api';

const SchedulesModal = ({ roomCode, isOpen, onClose }) => {
    const [schedules, setSchedules] = useState();
    
  async function getRoomSchedules() {
    const schedules = await api.get(`/schedules/${roomCode}`);

    console.log(schedules);

    setSchedules(schedules.data);
  }

  useEffect(() => {
    getRoomSchedules();
  }, []);

  

  return (
    <>
      {schedules && (
        <ChakraProvider>
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
            <ModalContent padding={10} maxW="120rem">
              <ModalCloseButton size="lg" />
              <ModalBody>
                <Tables data={schedules} room_code={roomCode} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      )}
    </>
  );
};

export default SchedulesModal;
