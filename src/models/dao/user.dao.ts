import { CRUDPostgreSQL } from "../../container/crud.container";
import { UserSchema } from "../schema/index.schema";
import { validatePassword } from "../../helpers/hashPassword";
import { generateToken } from "../../config/token";

 

class UserDao extends CRUDPostgreSQL<any> {
    constructor(){
        super(UserSchema)
    }

    async updateUser(id: string, parameter: string, data: string){
      try {
        const updateUser = await super.updateByParameters(id,parameter, data)
        return updateUser
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async getAllUsersTest(){
        try {
            const allUser = await super.getAll()
            return allUser
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteUsers(array: Array<{id: number, deleted: undefined | boolean}>){
        try {
            console.log(array, array.length, "Dentro de la dao");
            const parameter : string = 'deleted'
            for(let i = 0; i < array.length; i++){
                const deletUser = await super.deleteUser(array[i].id, parameter, true)
                array[i].deleted = deletUser.dataValues.deleted
            }
            return array
            
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    
    async getUsers(amount: string, page: string, search: string | undefined){
        try {
            const parameter : string = "admin";
            const parameter2 : string = "superAdmin";
            const value : boolean = false;
            const allUsers = await super.getAllByTwoParameterBoolean(parameter, parameter2, value, value)
            if(!allUsers){
                return null
            }else{
                const recortedUser = await super.cutResultByAmountAndPage(amount, page, allUsers, search)
                if(!recortedUser){
                    return null
                }else{
                    return recortedUser
                }
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

  async loginUser(email: string, password: string) {
    try {
      const parameter = "email";
      const foundUser = await super.getByParameter(parameter, email);
      if (!foundUser) {
        return null;
      } else {
        let validation = await validatePassword(password, foundUser.dataValues);

        if (validation) {
          const payload = {
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
            name: foundUser.name,
            lastname: foundUser.lastname,
            admin: foundUser.admin,
            superAdmin: foundUser.superAdmin,
            score: foundUser.score,
            premiun: foundUser.premiun,
            localidad: foundUser.localidad,
            phone: foundUser.phone,
          };

          const token = await generateToken(payload);
          return token;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createUser(user: {
    id: number;
    email: string;
    password: string;
    dni?: number;
    localidad?: string;
    phone?: number;
    name?: string;
    lastname?: string;
    username?:string;
    fullname?: string;
    birth_date?: Date;
  }) {
    try {
      const res = await super.create(user);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findByUsername(username: string) {
    try {
      const parameter = "username"; // Especifica el nombre del campo en la base de datos que contiene el username
      const foundUser = await super.getByParameter(parameter, username);

      // Si encontró un usuario con ese username, devuelve el usuario
      // Si no encontró un usuario, devolver null o false, según tu lógica de negocio
      return foundUser || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export { UserDao as UserDaoPostgresSQL };
