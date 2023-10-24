
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

type BtnGoBackProps = {
  navigateTo: string | number;
  color: string | null
  visible:boolean
};

const BtnGoBack = ({ navigateTo,color,visible }: BtnGoBackProps): React.ReactElement => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof navigateTo === 'string') {
      navigate(navigateTo);
    } else {
      navigate(navigateTo);
    }
  };

  return (
    <div className={`${visible?'visible':'hidden'}`}>
      <IoChevronBackSharp color={color} size={30} onClick={handleClick} />
    </div>
  );
};

export default BtnGoBack