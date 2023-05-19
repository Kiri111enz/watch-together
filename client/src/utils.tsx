export const queryToBool = (query: string): boolean => {
    if (query == 'true')
        return true;
    if (query == 'false')
        return false;
    throw new Error('Unexpected query!');
};