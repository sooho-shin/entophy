import styled from 'styled-components';

type BadgeProps = {
  text: string;
};

export const Badge = ({ text }: BadgeProps) => {
  return <BadgeItem>{text}</BadgeItem>;
};

const BadgeItem = styled.div`
  height: 24px;
  padding: 4px 6px;
  background: ${({ theme }) => theme.colors.primary.primary1};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.gray.gray4};
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;
