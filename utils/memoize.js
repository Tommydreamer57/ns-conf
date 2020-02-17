
export default fn => {
    const memo = [];
    const remember = (args, result) => {
        memo.push({
            arguments: args,
            result,
        });
        return result;
    }
    const lookup = args => {
        const { result } = memo.find(({ arguments: prevArgs }) => (
            prevArgs.every((arg, i) => arg === args[i])
        )) || {};
        return result;
    }
    return (...args) => lookup(args) || remember(args, fn(...args));
}
