import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../../db";
import bcrypt from "bcrypt";
import { hashPassword } from "../../helpers/hashPassword";
import { WeightSchema } from "./index.schema";

class User extends Model <InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>;
    declare name: string | null;
    declare lastname: string | null;
    declare fullName: string | null;
    declare username: string | null;
    declare dni: number | null;
    declare phone: number | null;
    declare avatar: string;
    declare deleted: boolean;
    declare actual_match: boolean | false;
    declare premiun: boolean | false;
    declare score: number;
    declare birth_date: CreationOptional<Date> | null;
    declare height: number;
    declare location: string;
    declare email: string;
    declare email_verified?: boolean |  false;
    declare password: string | null;
    declare salt: string;
    declare admin: boolean | false;
    declare superAdmin: boolean | false;
    declare created_at: CreationOptional<Date>;
    declare update_at: CreationOptional<Date>;

    public static associate(){
        User.hasMany(WeightSchema);
    }
} 

User.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true
    },
    birth_date:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        unique: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    avatar: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "https://sirenas-media-bucket.s3.amazonaws.com/sirenas/assets/default/user/conejoEstofado.jpg"
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    actual_match: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    premiun: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    salt: {
        type: DataTypes.STRING,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    superAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false
    }
}, {sequelize: db, modelName: "User", tableName: "users", timestamps: false})

User.beforeCreate(async (user: {password: string | null, salt: string}) => {
    const salt = bcrypt.genSaltSync()
    user.salt = salt;
    
    if(!user.password){
        user.password = null
    }else{
        const password : string = await hashPassword(user.password, salt)
        user.password = password
    }
}) 

export default User