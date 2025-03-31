import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate('/game');
        }}
      >
        Join
      </button>
    </div>
  );
};

export default Landing;
