import { css } from 'styled-components';

export const icon = (color: string = '#fff', side: 'right' | 'left') => css`
  color: ${color};
  height: 10px;
  width: 10px;
  filter: invert(100%);
  position: absolute;
  bottom: 6px;
  ${side}: 6px;
  transition: height 300ms ease, width 300ms ease;

  &:hover {
    height: 16px;
    width: 16px;
  }
`;
