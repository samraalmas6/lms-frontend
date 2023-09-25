import React from 'react';

const CircleWithInitials = ({ firstName, lastName, color }) => {
  // Pehle aur doosre name ke first letter nikalen
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      {firstInitial + lastInitial}
    </div>
  );
};

export default CircleWithInitials;
