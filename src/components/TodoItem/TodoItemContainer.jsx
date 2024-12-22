import styled from 'styled-components';

const Root = styled.div `
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 5px 0;
  max-width: 324px;
`

export const TodoItemContainer = ({children}) => {
  return <Root>{children}</Root>
}