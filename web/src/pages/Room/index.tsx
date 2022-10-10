import React from 'react';
import {
  MdOutlineAssignmentLate,
  MdOutlineFmdBad,
  MdOutlineGroup,
  MdOutlineStairs
} from 'react-icons/md';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { Content, Divider } from './styles';
import { Form } from '@unform/web';

const index = () => {
      function handleSubmit(data: object): void {
        console.log(data);
      }
  
  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <div className="room-image">
            <img
              src="https://unimontes.br/wp-content/uploads/2021/03/Predio-seis-sala-de-aula.jpg"
              alt=""
            />
          </div>

          <section className="room-section">
            <Form onSubmit={handleSubmit}>
              <div className="room-infos">
                <div className="room-header">
                  <h2>Sala 01</h2>
                  <Button text="Reservar espaço" />
                </div>

                <Divider />

                <div className="room-inputs">
                  <Select
                    name="andar"
                    icon={MdOutlineStairs}
                    iconSize={23}
                    placeholder="Andar"
                    options={[
                      {
                        text: '1° andar',
                        value: 1
                      },
                      {
                        text: '2° andar',
                        value: 2
                      }
                    ]}
                  />

                  <Select
                    name="capacity"
                    icon={MdOutlineGroup}
                    iconSize={23}
                    placeholder="Capacidade"
                    options={[
                      {
                        text: '10 pessoas',
                        value: 1
                      },
                      {
                        text: '20 pessoas',
                        value: 2
                      }
                    ]}
                  />

                  <Select
                    name="situation"
                    icon={MdOutlineAssignmentLate}
                    iconSize={23}
                    placeholder="Disponibilidade"
                    options={[
                      {
                        text: 'Disponível',
                        value: 1
                      },
                      {
                        text: 'Em manutenção',
                        value: 2
                      }
                    ]}
                  />
                </div>

                <div className="room-textarea">
                  <Textarea />
                </div>
              </div>
            </Form>
          </section>

          <section className="room-section">
            <div className="room-infos">
              <div className="room-header">
                <h2>Horários </h2>
                <Button text="Salvar horários" />
              </div>

              <Divider />
            </div>
          </section>
        </Content>
      </div>
    </>
  );
};

export default index;
