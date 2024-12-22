import React, {useState} from 'react';
import styled, {css} from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useDeleteTodoItem} from "../../data/hooks/useData";
import {TodoItemPrioritySelect} from "./TodoItemPrioritySelect";

const checkedCss = css`
    color: #B5B5BA;
    text-decoration: line-through;
`

const Title = styled.span(props => {
    return `
    font-size: 15px;
    word-break: break-all;
    max-width: 70%;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
    display: inline-block;
    width: 13px;
    height: 13px;
    background-color: white;
    border-radius: 50%;
    background-image: url(/assets/images/png/delete.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 13px;
    cursor: pointer;
`;

const colorsByPriority = {
    1: '#F08080',
    2: '#FFE4B5',
    3: '#3CB371',
};

export const TodoItem = ({id, title, checked, priority}) => {
    const {mutate} = useDeleteTodoItem();
    const [priorityState, setPriorityState] = useState(priority);

    const onClick = (_) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            mutate({id: id});
        }
    }

    const priorityChanged = (e) => {
        setPriorityState(e.target.value);
    };

    return (
        <TodoItemContainer color={colorsByPriority[priorityState]}>
            <TodoItemCheckbox checked={checked} id={id}/>
            <Title checked={checked}>
                {title}
            </Title>
            <TodoItemPrioritySelect value={priorityState}
                                    id={id}
                                    onChange={priorityChanged}/>
            <Delete onClick={onClick}/>
        </TodoItemContainer>
    )
}
