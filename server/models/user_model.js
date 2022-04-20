import 'dotenv/config';
import { client, collection_docs, collection_users } from './mongodb.js';
import { ObjectId } from 'mongodb';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds

const DOC_ROLE = {
    OWNER: 'O',
    EDITOR: 'E',
    VIEWER: 'V',
}

const signUp = async (name, email, password) => {
    try {
        const emails = await collection_users.find({email}).project({ _id: 0, email: 1}).toArray();        
        if (emails.length > 0) {
            return { error: 'Email Already Exists' };
        }

        const hashedPwd = await argon2.hash(password);

        const loginAt = dayjs().format();
        const createdDt = dayjs().format();
        const updatedDt = dayjs().format();

        const user = {
            provider: 'native',
            email,
            password: hashedPwd,
            name,
            last_login_at: loginAt,
            created_dt: createdDt,
            updated_dt: updatedDt,
        };

        const result = await collection_users.insertOne(user);
        
        const accessToken = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRE },
        );
        user.access_token = accessToken;
        user.access_expired = TOKEN_EXPIRE;

        user.id = result['insertedId'].toHexString();
        return { user };
    } catch (err) {
        console.log(err);
        return { err };
    }
}

const nativeSignIn = async (email, password) => {
    try {
        const user = await collection_users.findOne({email});
        if (!user) {
            return { error: 'Email Not Found' };
        }

        if (!await argon2.verify(user.password, password)) {
            return { error: 'Password is wrong' };
        }

        const loginAt = dayjs().format();
        const updatedDt = dayjs().format();

        const accessToken = jwt.sign(
            {
                provider: user.provider,
                name: user.name,
                email: user.email,
            },
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRE },
        );

        await collection_users.findOneAndUpdate(
            {email},
            {$set: {
                last_login_at: loginAt,
                updated_dt: updatedDt,
            }},
        );

        user.access_token = accessToken;
        user.access_expired = TOKEN_EXPIRE;
        user.login_at = loginAt;

        return { user };
    } catch (err) {
        return { err };
    }
};

const getUserDetail = async (email) => {
    try {
        const user = await collection_users.findOne({email});
        user['id'] = user['_id'].toHexString();
        delete user['_id'];
        return user;
    } catch (err) {
        console.error('get user detail error:', err);
        return null;
    }
}

const getUserDocs = async (userId) => {
    try {
        // const rawDocInfos = await collection.find({[`users.${userId}`]: {"$exists": true}}).project({data: 0}).toArray();

        const rawDocInfos = await collection_docs.find({[`users.${userId}`]: {"$exists": true}}).project({users: 1, 'data.info': 1, 'data.openapi': 1}).toArray();

        const docInfos = rawDocInfos.map(info => {
            info['id'] = info._id.toHexString();
            delete info._id;

            info['role'] = Object.keys(DOC_ROLE).find(key => DOC_ROLE[key] === info.users[userId]).toLowerCase();
            delete info.users;

            if (info.data && info.data.info) {
                info['info'] = info.data.info;    
            } else {
                info['info'] = '';
            }
            
            if (info.data && info.data.openapi) {
                info['openapi'] = info.data.openapi;
            } else {
                info['openapi'] = '';
            }
            delete info.data;

            return info;
        })

        return docInfos;
    } catch (err) {
        console.log('get user docs error:', err);
        return null;
    }
};

const getDocRole = async (userId, docId) => {
    try {
        const result = await collection_docs.findOne({"_id": ObjectId(docId)}, {projection: {[`users.${userId}`]: 1, _id: 0}});
        return result.users[userId];
    } catch (err) {
        return null;
    }
};

export { 
    DOC_ROLE,
    signUp, 
    nativeSignIn, 
    getUserDetail, 
    getUserDocs, 
    getDocRole,
};