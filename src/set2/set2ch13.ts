interface user_profile {
    email: string,
    uid: number,
    role: string
}

function profileFor(email: string) {
    const retObject:user_profile = {
        email,
        uid: Math.random() * 100,
        role: 'user'
    }
    return retObject
}   

function parseCookie(cookie: string) {
    const args = cookie.split('&')
    const retObject: any = {}
    args.forEach(arg => {
        const [key, value] = arg.split('=')
        retObject[key] = value
    })
    return retObject
}

export {
    parseCookie,
    profileFor
}