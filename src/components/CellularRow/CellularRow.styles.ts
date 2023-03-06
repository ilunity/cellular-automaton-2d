import styled from 'styled-components';

interface StyledCell {
  isActive: boolean;
}

export const Cell = styled.div<StyledCell>`
  height: 25px;
  width: 25px;
  background-color: ${ props => props.isActive ? '#f79646' : 'inherit' };
  border: black 1px solid;
  cursor: default;
  user-select: none;
`;
