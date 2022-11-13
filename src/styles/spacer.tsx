import React, { FC } from "react";
import styled, { css } from "styled-components";

type Props = {
  y?: number;
  x?: number;
};
export const Spacer: FC<Props> = ({ y, x }) => {
  return <Container height={y} width={x} />;
};
const Container = styled.div<{ height?: number; width?: number }>`
  ${({ height = 0, width = 0 }) => css`
    height: ${height}px;
    width: ${width}px;
  `}
`;
