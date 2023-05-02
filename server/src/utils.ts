export const randomNumber = (digitCount: number): number => {
    const tmp = Math.pow(10, digitCount - 1);
    return Math.floor(tmp + Math.random() * Math.pow(10, digitCount) - tmp);
};