
const generateOtp=()=>{
    return Math.floor(Math.random() * 900000)+100000; //10 000 to 99 9999
}

export default generateOtp;





