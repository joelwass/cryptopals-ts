import { 
    encryptAES128InECB,
    decryptAES128InECB
 } from '../set1/set1ch7'

interface user_profile {
    email: string,
    uid: number,
    role: string
}

function profileFor(email: string): any {
    const cleanedEmail = email.replace('&', '').replace('=', '')
    const retObject:user_profile = {
        email: cleanedEmail,
        uid: Math.random() * 100,
        role: 'user'
    }
    return retObject
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

function encryptProfile(profileObject: any, key: Buffer): Buffer {
    const profileString = JSON.stringify(profileObject)
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