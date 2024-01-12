export const orderImage = (arrTst, peers) => {
    let x = 0
    let arr = []
    if (peers == null) return
    peers.map(arrp => {
        const [a, b] = arrp
        arr[a] = arrTst[x]
        arr[b] = arrTst[x + 1]
        x = x + 2
    })
    return arr
}

export const getArrRandom = (lngNumber) => {
    const arryPeers = [];
    const numAvailable = Array.from({ length: lngNumber * 2 }, (_, index) => index);
    while (numAvailable.length > 0) {
        const index1 = Math.floor(Math.random() * numAvailable.length);
        const num1 = numAvailable.splice(index1, 1)[0];
        const index2 = Math.floor(Math.random() * numAvailable.length);
        const num2 = numAvailable.splice(index2, 1)[0];
        arryPeers.push([num1, num2, false, false, false]);
    }
    return arryPeers;
}