import styled, { css } from '@/styles/themed-components';

const Tooltip = ({ text, last }: { text: string; last: boolean }) => {
  return <TooltipBox last={last}>{text}</TooltipBox>;
};

interface TooltipBoxProps {
  last: boolean;
}

const TooltipBox = styled.div<TooltipBoxProps>`
  width: fit-content;
  background: ${({ theme }) => theme.colors.gray.gray3};
  border-radius: 8px;
  position: absolute;
  color: #fff;
  padding: 8px 12px;
  bottom: -70%;
  z-index: 10;
  ${(props) =>
    props.last &&
    css`
      bottom: 0;
    `}
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

export default Tooltip;
