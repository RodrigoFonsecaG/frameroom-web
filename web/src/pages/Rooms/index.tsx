import React from 'react'
import Header from '../../components/Header'
import Select from '../../components/Select'
import { MdOutlineStairs, MdOutlineMeetingRoom, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import {Content} from './styles'
import Button from '../../components/Button'
import { Form } from '@unform/web'

const Rooms = () => {
    function handleSubmit(data: object): void {
      console.log(data);
    }
  
  return (
    <>
      <Header />
      <div className="container">
        <Content>

            <Form onSubmit={handleSubmit} className="filters">
              <Select
                name="type"
                icon={MdOutlineMeetingRoom}
                iconSize={23}
                placeholder="Tipo de espaço"
                options={[
                  {
                    text: 'Sala',
                    value: 1
                  },
                  {
                    text: 'Laborátorio',
                    value: 2
                  },
                  {
                    text: 'Auditório',
                    value: 3
                  }
                ]}
              />

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
            </Form>
       

          <div className="cards">
            <div className="card">
              <img
                src="https://unimontes.br/wp-content/uploads/2021/03/Predio-seis-sala-de-aula.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Sala 01</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>20</p>
                  </div>
                </div>

                <Button text="Visualizar" />
              </div>
            </div>

            <div className="card">
              <img
                src="https://unimontes.br/wp-content/uploads/2021/03/Predio-seis-sala-de-aula.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Sala 01</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>20</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>

            <div className="card">
              <img
                src="https://unimontes.br/wp-content/uploads/2021/03/Predio-seis-sala-de-aula.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Sala 01</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>20</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>
            <div className="card">
              <img
                src="https://unimontes.br/wp-content/uploads/2021/03/Predio-seis-sala-de-aula.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Sala 01</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>25</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>

            <div className="card">
              <img
                src="https://diariodocomercio.com.br/wp-content/uploads/2022/01/computadores-unimontes.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Laborátorio 2</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>25</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>

            <div className="card">
              <img
                src="https://diariodocomercio.com.br/wp-content/uploads/2022/01/computadores-unimontes.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Laborátorio 2</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>25</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>

            <div className="card">
              <img
                src="https://diariodocomercio.com.br/wp-content/uploads/2022/01/computadores-unimontes.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Laborátorio 2</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>25</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>

            <div className="card">
              <img
                src="https://diariodocomercio.com.br/wp-content/uploads/2022/01/computadores-unimontes.jpg"
                alt=""
              />

              <div className="room-title">
                <h2>Laborátorio 2</h2>

                <a href="">
                  <MdOutlineDriveFileRenameOutline size={22} />
                </a>
              </div>

              <div className="room-info">
                <div className="info">
                  <div>
                    <span>Andar:</span>
                    <p>1°</p>
                  </div>

                  <div>
                    <span>Capacidade:</span>
                    <p>20</p>
                  </div>
                </div>

                <button>Visualizar</button>
              </div>
            </div>
          </div>
        </Content>
      </div>
    </>
  );
}

export default Rooms