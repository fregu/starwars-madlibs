import React from 'react';
import getTimeString from '../../helpers/getTimeString';
import './index.css';

// Just for funsies, because I dont really like the Classes
export default function Item (props) {
  const {timestamp, name} = props.data;
  const timeString = getTimeString(timestamp);

  function renderDetails (details) {
    return (<div className="Item-details">
      {details.map((detail, index) => (
        <dl className="Item-detail" key={`detail-${index}`}>
          <dt className="Item-detailTitle">{detail.title}</dt>
          <dd className="Item-detailValue">{detail.value}</dd>
        </dl>
      ))}
    </div>)
  }

  let details;
  switch (props.data.type) {
    case 'people':
      details = [
        { title: 'Name', value: name },
        { title: 'Species', value: props.data.species.name ? props.data.species.name : '' },
        { title: 'Height', value: props.data.height },
        { title: 'Mass', value: props.data.mass },
        { title: 'Gender', value: props.data.gender },
        { title: 'Birth year', value: props.data.birth_year },
        { title: 'Home world', value: props.data.homeworld.name ? props.data.homeworld.name : '' },
        { title: 'Added', value: timeString }
      ];
      break;
    case 'vehicles':
      details = [
        { title: 'Name', value: name },
        { title: 'Model', value: props.data.model },
        { title: 'Manufacturer', value: props.data.manufacturer },
        { title: 'Vehicle class', value: props.data.vehicle_class },
        { title: 'Max atmospheric speed', value: props.data.max_atmosphering_speed },
        { title: 'Cost', value: props.data.cost_in_credits + ' credits' },
        { title: 'Added', value: timeString }
      ];
      break;
    default:
      details = [
        { title: 'Name', value: name },
        { title: 'Added', value: timeString }
      ];
  }
  let type;
  switch (props.data.type) {
    case 'people':
      type = 'Character';
      break;
    case 'vehicles':
      type = 'Vehicle';
      break;
    case 'starships':
      type = 'Star ship';
      break;
    default:
      type = '';
  }

  return props.data ? (
    <div className='Item'>
      <h3 className="Item-title">{type}</h3>
      {renderDetails(details)}
    </div>
  ) : null;
}
