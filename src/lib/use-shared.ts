import {
    createContextId,
    useContext,
    useContextProvider
} from "@builder.io/qwik";

export const sharedContext = <T>(name: string) =>
    createContextId<T>('io.builder.qwik.' + name);

export const getShared = <T extends object>(name: string) =>
    useContext<T, null>(sharedContext(name), null);

export const createShared = <T extends object>(name: string, content: T) =>
    useContextProvider<T>(sharedContext(name), content);

export const useShared = <T extends object>(
    hook: () => T,
    name: string
) => {

    // get context if exists
    const shared = getShared<T>(name);
    if (shared) {
        return shared;
    }

    // return new shared context
    const _shared = hook();
    createShared(name, _shared);
    return _shared;
};
