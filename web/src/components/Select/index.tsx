import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';
import { FiChevronDown } from 'react-icons/fi';

interface optionsKeys {
  text: string;
  value?: number | string;
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  iconSize?: number;
  placeholder?: string;
  options: Array<optionsKeys>;
  icon: React.ComponentType<{ size: number }>;
}

const Select: React.FC<InputProps> = ({
  icon: Icon,
  options,
  iconSize,
  placeholder,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor="">Tipo de espaço</label>
      <Container>
        <Icon size={iconSize ? iconSize : 20} />
        <select {...rest}>
          {options.map((option) => {
            return <option value={option.value}>{option.text}</option>;
          })}
        </select>
        <div className="icon-container">
          <FiChevronDown size={20} />
        </div>
      </Container>
    </div>
  );
};

export default Select;
