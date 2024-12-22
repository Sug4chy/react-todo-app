import {useChangePriority} from "../../data/hooks/useChangePrority";

const priorities = [1, 2, 3];

export const TodoItemPrioritySelect = ({value: currentPriority, id, onChange}) => {
    const {changePriority} = useChangePriority();

    const onSelectedValueChanged = (e) => {
        if (changePriority) {
            changePriority({id: id, priority: e.target.value});
        }

        if (onChange) {
            onChange(e);
        }
    }

    return <select value={currentPriority} onChange={onSelectedValueChanged}>
        {priorities.map((priority) => (
            <option key={priority} value={priority}>
                {priority}
            </option>
        ))}
    </select>
}