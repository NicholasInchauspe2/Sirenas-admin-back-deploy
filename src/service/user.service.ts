import { DaoFactory } from "../models/factory";
import { hashPassword } from "../helpers/hashPassword";
import { UserSchema } from "../models/schema/index.schema";
import { PosibleUser } from "../interfaces/user.interfaces";

const dao = DaoFactory.getUserDao();

let instanciaUser : null | Service = null;

class Service {
    static getInstance = () => {
        if(!instanciaUser) {
            instanciaUser = new Service();}
            return instanciaUser
    }

    async updateUser(id: string, data: string, parameter: string){
        try {
            return await dao.updateUser(id, parameter, data)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteUsers(array: Array<{id: number}>){
        try {
            console.log(array, "Dentro del  service");
            return await dao.deleteUsers(array)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async singUp(user: PosibleUser){
        try {
            let lastUserId: number = await UserSchema.max("id");
            if (!lastUserId) {
              lastUserId = 0;
            }
            user.id = lastUserId + 1
            if(user.username){
                if(user.username.split("")[0] !== '@'){
                    user.username = `@${user.username}`
               }
               return await dao.createUser(user)
            }
           return await dao.createUser(user)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async singUpAdmin(email: string, password: string){
        try {
            let lastUserId: number = await UserSchema.max("id");
            if (!lastUserId) {
              lastUserId = 0;
            }
            let id = lastUserId + 1
            let user = {id, email, password, fullName: "fullname admin", name: "admin name", lastname: "admin lastname"}
           return await dao.createUser(user)
        
        } catch (error) {
            console.error(error);
            return false;
        }
    }


    async singin(email: string, password: string){
        try {
            return await dao.loginUser(email, password)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async allUserTest(){
        try {
            return await dao.getAllUsersTest()
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async allUser(amount: string, page: string, search: string | undefined){
        try {
            return await dao.getUsers(amount, page, search)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async findOne(id: string){
        try {
            return await dao.getById(id)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async findByIGUsername(username: string){
        try {
            return await dao.findByUsername(username)
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export { Service as UserService }