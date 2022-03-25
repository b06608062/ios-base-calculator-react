const calculate = (OPDStack, OPRStack)=>{
    // console.log(OPDStack);
    // console.log(OPRStack);
    let ans = OPDStack.shift();
    while(OPDStack.length){
        ans = OPRStack.shift()==="+"?ans+OPDStack.shift():ans-OPDStack.shift();
    }
    return ans;
}

export default calculate;