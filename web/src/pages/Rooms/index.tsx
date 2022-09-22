import React from 'react'
import Header from '../../components/Header'
import Select from '../../components/Select'
import { MdOutlineStairs, MdOutlineMeetingRoom } from 'react-icons/md'
import {  FiClock } from 'react-icons/fi';
import {Content} from './styles'

const Rooms = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Content>
          <div className="filters">
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

            
          </div>
        </Content>
      </div>
    </>
  );
}

export default Rooms