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
    const expectedReturn = {
        email: 'foo@bar.com',
        uid: 10,
        role: 'user'
    }   
    t.true(profileFor('foo@bar.com').email === expectedReturn.email)
    t.true(profileFor('foo@bar.com').role === expectedReturn.role)
})

ava.test('should create user profile from email with metaencoding characters by eating them', t => {
    const expectedReturn = {
        email: 'foo@bar.comtesttrue',
        uid: 10,
        role: 'user'
    }   
    t.true(profileFor('foo@bar.com&test=true').email === expectedReturn.email)
})

ava.test('should encrypt and decrypt profile after creating one', t => {
    const expectedReturn = {
        email: 'foo@bar.com',
        uid: 10,
        role: 'user'
    }   
    const profile = profileFor('foo@bar.com')
    const encryptedProfile = encryptProfile(profile, key)
    t.true(decryptProfile(encryptedProfile, key).toString('ascii').includes('foo@bar.com'))
})