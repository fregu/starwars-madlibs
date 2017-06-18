export default function getTimeString(dateString) {
  const date = new Date(dateString);
  const months = ['january', 'february', 'mars', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${hour < 10 ? '0': ''}${hour}:${minutes < 10 ? '0': ''}${minutes} ${day} ${month} ${year}`;
}
