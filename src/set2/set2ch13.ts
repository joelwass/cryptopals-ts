import { 
    encryptAES128InECB,
    decryptAES128InECB
 } from '../set1/set1ch7'

interface user_profile {
    email: string,
    uid: number,
    role: string
}

function profileFor(email: string): string {
    const cleanedEmail = email.replace('&', '').replace('=', '')
    return `email=${cleanedEmail}&uid=${10}&role=user`
}   

function parseCookie(cookie: string): any {
    const args = cookie.split('&')
    const retObject: any = {}
    args.forEach(arg => {
        const [key, value] = arg.split('=')
        retObject[key] = value
    })
    return retObject
}

function encryptProfile(profileString: string, key: Buffer): Buffer {
    const data = Buffer.from(profileString, 'ascii')

    return encryptAES128InECB(data, key)
}

function decryptProfile(data: Buffer, key: Buffer): Buffer {
    return decryptAES128InECB(data, key)
}

export {
    parseCookie,
    profileFor,
    encryptProfile,
    decryptProfile
}