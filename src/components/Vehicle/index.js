import React from 'react';

export default function Vehicle (props) {
  function onClick() {
    props.removeItem(props.data);
  }
  const {timestamp, name} = props.data;
  const months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augisti', 'september', 'oktober', 'november', 'december'];

  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const day = timestamp.getDate();
  const month = months[timestamp.getMonth()];
  const year = timestamp.getFullYear();


  return (
    <div className='Vehicle' onClick={onClick}>
      <strong>{name}</strong>
      <em>{`${hour < 10 ? '0': ''}${hour}:${minutes < 10 ? '0': ''}${minutes} ${day} ${month} ${year}`}</em>
    </div>
  )
}
