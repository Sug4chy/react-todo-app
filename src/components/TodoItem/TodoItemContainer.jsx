import styled from 'styled-components';

const Root = styled.div(props => {
    return `
    display: flex;
    gap: 9px;
    align-items: center;
    padding: 5px 0;
    max-width: 324px;
    ${props.color ? `background-color: ${props.color};` : ''}
`
})

export const TodoItemContainer = ({children, color}) => {
    return <Root color={color}>{children}</Root>
}