const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

export const LocalStorage = {
    getTodoItemsFromLocalStorage: () => {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
                const defaultResult = [];

                if (!rawData) {
                    resolve(defaultResult);
                    return;
                }
                const data = JSON.parse(rawData);

                if (!Array.isArray(data)) {
                    resolve(defaultResult);
                    return;
                }

                resolve(data);
            }, 500);
        })
    },

    saveTodoItemToLocalStorage: (todoItem) => {
        return new Promise((resolve, _) => {
            LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
                const newTodoItems = [...todoItems, todoItem];
                localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
                resolve();
            })
        });
    },

    deleteTodoItemFromLocalStorage: (id) => {
        return new Promise((resolve, _) => {
            LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
                localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY,
                    JSON.stringify(
                        todoItems.filter(
                            (todoItem) => todoItem.id !== id
                        )
                    )
                );
                resolve();
            })
        })
    }
}