import { FC } from 'react';

interface ButtonProps {
  title?: string;
  width?: string;
  id?: string;
  onClick?: () => void;
}

export const Button: FC <ButtonProps> = ({title = 'Ok', width = '', id = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), onClick}: ButtonProps) => {
  return (
    <Col width={width}>
      <button
        className={`btn btn-primary`}
        id={id}
        onClick={onClick}
      >
        {title}
      </button>
    </Col>
  );
}