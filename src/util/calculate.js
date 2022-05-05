const calculate = (OPDStack, OPRStack) => {
    let ans = OPDStack.shift();
    while (OPDStack.length) {
        ans = OPRStack.shift() === "+" ? ans + OPDStack.shift() : ans - OPDStack.shift();
    }
    return ans;
}

export default calculate;
