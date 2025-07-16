import { FC, useState, useEffect } from 'react';
import dayjsUtil from '../../utils/dayjs';
import Tooltip from '@/component/common/Tooltip';

const AgeTd: FC<{ date: string | number | Date; last: boolean }> = ({ date, last }) => {
  const [hover, setHover] = useState(false);
  const [diffDay, setDiffDay] = useState<string>();
  useEffect(() => {
    setDiffDay(dayjsUtil.getDiffDay(date));
  }, [date]);

  return (
    <td onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <p>
        <span className="sub">{diffDay}</span>
      </p>
      {hover && <Tooltip text={dayjsUtil.getUtcFormat(date)} last={last} />}
      {/* {<Tooltip text={dayjsUtil.getUtcFormat(date)} />} */}
    </td>
  );
};

export default AgeTd;
