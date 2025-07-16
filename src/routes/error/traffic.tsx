import ErrorComponent from '@/component/error/ErrorComponent';

const ErrorTraffic = () => {
  return (
    <ErrorComponent>
      <div className="content">
        <h1>Blocked due to excessive traffic</h1>
        <p>
          Thank you for using the entropy.
          <br />
          We have detected unusual amounts of traffic coming from your network, please try
          again later
        </p>
        <img
          className="img-traffic"
          src="/images/img_bg_traffic.svg"
          alt="traffic error"
        />
      </div>
    </ErrorComponent>
  );
};

export default ErrorTraffic;
