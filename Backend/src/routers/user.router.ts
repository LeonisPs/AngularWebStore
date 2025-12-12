import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { HTTP_BAD_REQUEST } from '../constants/http_status';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCounts = await UserModel.countDocuments();
        if (userCounts> 0) {
            res.send(sample_users);
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed Is Done");
    } 
))

router.post("/login", asyncHandler( 
    async (req,res) => {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.send(generateTokenResponse(user));
        }else{
            res.status(HTTP_BAD_REQUEST).send("User name or password is not valid");
        }
    }
))

router.post('/register', asyncHandler(
    async (req, res) => {
        const{email, password, name, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send('User already exists');
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser:User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
        id: user.id, email:user.email, isAdmin:user.isAdmin
    },process.env.JWT_SECRET!,{
        expiresIn:"30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;