const keyboardSates = new Map();

onmessage = (mess) => {
    keyboardSates[mess.data.key] = mess.data.state;
    const player = mess.data.ship
    if(keyboardSates["ArrowLeft"]){
        console.log("KURWA")
    }
    if(keyboardSates["ArrowRight"]){
        console.log("MAĆ")
    }
}

