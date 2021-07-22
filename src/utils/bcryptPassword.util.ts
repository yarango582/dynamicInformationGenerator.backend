import bcrypt from 'bcrypt';

export function encodeText(text:string, salts: number) {
    return text = bcrypt.hashSync(text, salts);
}

export function compareTextEncoded(text:string, encodedText:string) {
    return bcrypt.compareSync(text, encodedText);
}