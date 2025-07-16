import ErrorComponent from '@/component/error/ErrorComponent';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorComponent>
      <div className="content">
        <h4>404</h4>
        <h1>
          Ooops!
          <br />
          Page Not Found
        </h1>
        <p>
          Don{"'"}t stay here long
          <br />
          Do you want go to the <Link to={'/'}>home</Link> and{' '}
          <button type="button" onClick={() => navigate(-1)}>
            back
          </button>
          ?
        </p>
        <img className="img-404" src="/images/img_bg_404.svg" alt="404 error" />
      </div>
    </ErrorComponent>
  );
};

export default NotFoundPage;
