import { Badge } from '@/component/common/Badge';
import SkeletonComponent from '@/component/common/Skeleton';
import styled from 'styled-components';

type TitleProps = {
  title: string;
  badge?: string[];
  menu?: string | boolean;
};

export const TitleBox = ({ title, badge }: TitleProps) => {
  return (
    <Title>
      <div className="row">
        <h3>{title}</h3>
        {/* {menu && <VerticalMenu except={typeof menu !== 'boolean' ? menu : ''} />} */}
        {badge && badge[0] !== 'undefined' && badge[0] !== 'null' ? (
          <div className="badge-row">
            {badge.map((v, i) => {
              return <Badge text={v} key={i + 1} />;
            })}
          </div>
        ) : (
          badge &&
          badge[0] === 'undefined' && <SkeletonComponent width="50px" height="24px" />
        )}
      </div>
    </Title>
  );
};

const Title = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.media.tablet`
    padding: 0 1rem;
    margin-bottom:1rem
  `}
  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.gray.gray5};
  }
  .row {
    width: 100%;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.media.tablet`
    flex-wrap:wrap;
    gap:4px
  `}
  }
  .badge-row {
    display: flex;
    gap: 0.5rem;
    ${({ theme }) => theme.media.tablet`
    width:100%
  `}
  }
`;
