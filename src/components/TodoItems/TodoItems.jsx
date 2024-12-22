import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import styled from "styled-components";

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
`;

const SortButton = styled.button`
    border: 1px solid #050505;
    padding: 5px;
    border-radius: 15px;
    width: 144px;
`;

export const TodoItems = () => {
    const [searchValue, setSearchValue] = useState('');
    const {data: todoItems, isLoading} = useData();
    const [sortDirection, setSortDirection] = useState('');

    if (!todoItems || isLoading) {
        return (
            <TodoItemsContainer>
                Загрузка данных...
            </TodoItemsContainer>
        );
    }

    const filteredBySearchItems = todoItems.filter((todoItem) => {
        if (searchValue.length < 3) {
            return true;
        }

        const clearedTodoItemTitle = todoItem.title.replaceAll(' ', '').toLowerCase()
        const clearedSearchValue = searchValue.replaceAll(' ', '').toLowerCase();

        return clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1;
    })

    const sortedItems = filteredBySearchItems.sort((a, b) => {
        if (sortDirection === 'desc') {
            return b.priority - a.priority;
        } else if (sortDirection === 'asc') {
            return a.priority - b.priority;
        }
    });

    const todoItemsElements = sortedItems.map((item, _) => {
        return <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            checked={item.isDone}
            priority={item.priority}/>;
    });

    return (
        <TodoItemsContainer>
            <SearchInput value={searchValue} setValue={setSearchValue}/>
            <ButtonsContainer>
                <SortButton onClick={() => setSortDirection(
                    sortDirection === 'desc' ? 'asc' : 'desc'
                )}>
                    {sortDirection === 'desc' ? 'По возрастанию' : 'По убыванию'}
                </SortButton>
            </ButtonsContainer>
            {todoItemsElements}
            <NewTodoItem/>
        </TodoItemsContainer>
    )
}