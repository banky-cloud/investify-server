const alphabet="abcdefghijklmnopqrstuvwxyz"
const numbers="1234567890";
const allChars= `${alphabet}${alphabet.toUpperCase()}${numbers}`

export default function generateCode(chars){
let code=``
    while(code.length<chars){
    code+=allChars[Math.floor(Math.random()*allChars.length)]
}
return code
}