import {useMutation, useQueryClient} from "@tanstack/react-query";
import {LocalStorage} from "../services/LocalStorage";

export const useChangePriority = () => {
    const client = useQueryClient();

    const {mutate, isPending, isSuccess} = useMutation({
        mutationFn: ({id, priority}) => {
            return LocalStorage.changePriority(id, priority)
        },
        onSuccess: () => {
            client.invalidateQueries(['todo']);
        },
    });

    return {
        changePriority: mutate,
        isPending,
        isSuccess
    }
}