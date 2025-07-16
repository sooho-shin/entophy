import ErrorComponent from '@/component/error/ErrorComponent';
import { Link, useNavigate } from 'react-router-dom';

const ErrorSearch = () => {
  const navigate = useNavigate();
  return (
    <ErrorComponent>
      <div className="content">
        <h1>
          No search results
          {/* {"'"}ㅇㅇㅇㅇㅇㅇㅇ{"'"} */}
        </h1>
        <p className="search-info">
          Sorry, your search did not match any results.
          <br />
          Please check your spelling and try again.
        </p>
        <div className="serch-arg">
          <div className="row">
            <span>Address</span>
            <span>42 characters (0x~)</span>
          </div>
          <div className="row">
            <span>txn hash</span>
            <span>66 characters (0x~)</span>
          </div>
          <div className="row">
            <span>block</span>
            <span>Decimal (00000000)</span>
          </div>
        </div>
        <p>
          or Do you want go to the <Link to={'/'}>home</Link> and{' '}
          <button type="button" onClick={() => navigate(-1)}>
            back
          </button>
          ?
        </p>
        <img className="img-search" src="/images/img_bg_search.svg" alt="search error" />
      </div>
    </ErrorComponent>
  );
};

export default ErrorSearch;
