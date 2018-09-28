import * as ava from 'ava'
import {
    parseCookie,
    profileFor,
    encryptProfile,
    decryptProfile
} from '../../set2/set2ch13'
import { genRandomAESKey } from '../../set2/set2ch11'

const key = genRandomAESKey(16)

ava.test('should parse cookie', t => {
    const expectedReturn = {
        foo: 'bar',
        baz: 'qux',
        zap: 'zazzle'
    }
    t.true(parseCookie('foo=bar&baz=qux&zap=zazzle').zap === expectedReturn.zap)
    t.true(parseCookie('foo=bar&baz=qux&zap=zazzle').foo === expectedReturn.foo)
    t.true(parseCookie('foo=bar&baz=qux&zap=zazzle').baz === expectedReturn.baz)
})

ava.test('should create user profile from email', t => {
    t.true(profileFor('foo@bar.com') === 'email=foo@bar.com&uid=10&role=user')
})

ava.test('should create user profile from email with metaencoding characters by eating them', t => { 
    t.true(profileFor('foo@bar.com&test=true') === 'email=foo@bar.comtesttrue&uid=10&role=user')
})

ava.test('should encrypt and decrypt profile after creating one', t => {  
    const profile = profileFor('foo@bar.com')
    const encryptedProfile = encryptProfile(profile, key)
    t.true(decryptProfile(encryptedProfile, key).toString('ascii').includes('foo@bar.com'))
})

ava.test('should change role to admin through encrypted text', t => {
    // first figure out the padding on the end 
    // email=foo@barar.  com&uid=10&role=  user  12x

    // want to get user at the offset within the block where i can manipulate
    // the same portion of the block in the first one, with the email 

    // here we're going to isolate the user + padding block at the end
    // "email=fsi@bara.  com&uid=10&role=  user"  11x

    // now we make a profile fsixchar@bara.com
    const profileIsolatedLastBlock = profileFor('fsii@bara.com')
    const encryptedProfileIsolatedLastBlock = encryptProfile(profileIsolatedLastBlock, key)

    // then we encrypt a profile with a super long email where a whole block is admin"10101010101010101010
    // "email=fsi@bara.  admin"10101010101010101010 com&uid=10&role=  user"  11x
    const profileAdmin = profileFor('fsii@bara.admin            com')
    const encryptedProfileAdmin = encryptProfile(profileAdmin, key)

    // now we can steal the second block from profileAdmin and put it where the last block was in our first encryptedProfile
    let returnBuffer = Buffer.alloc(48)
    for (let i = 0; i < 48; i++) {
        if (i < 32) {
            returnBuffer[i] = encryptedProfileIsolatedLastBlock[i]
        } else {
            returnBuffer[i] = encryptedProfileAdmin[i-16]
        }
    }

    const parsedCookie = parseCookie(decryptProfile(returnBuffer, key).toString('ascii'))
    t.true(parsedCookie.role.trim() === 'admin')
})