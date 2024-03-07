import ethereum from '../assets/ethereum.svg';
import plus from '../assets/plus.svg';
import search from '../assets/search.svg';

const Server = () => {
  return (
    <div className='servers'>
      <div className='server'>
        <img src={ethereum} alt='Sample Ethereum Logo' />
      </div>
      <div className='server'>
        <img src={plus} alt='Sample Add Icon' />
      </div>
      <div className='server'>
        <img src={search} alt='Sample Search Functionality' />
      </div>
    </div>
  );
};

export default Server;
