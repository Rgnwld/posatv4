import crypto from 'crypto';

export function HashPassword(pswd) {
    return crypto.createHash('md5').update(pswd).digest('hex');
}



