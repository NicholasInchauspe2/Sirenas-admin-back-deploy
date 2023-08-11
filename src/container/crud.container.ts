import { Model } from "sequelize";

class CRUD<TModel extends Model> {
  private model:  any

  constructor(model: any) {
    this.model = model;
  }


  async create(data : any){
    try {
        const createdItem = await this.model.create(data);
        return createdItem;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating item");
        
    }
  }

  async getAll() {
    try {
        const items = await this.model.findAll();
        console.log(items);
        return items
        
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving items");
    }
  }

  async getAllByTwoParameterBoolean(parameter: string, parameter2: string, value: boolean, value2: boolean){
    try {
      const items = await this.model.findAll({
        where: {
          [parameter]: value,
          [parameter2]: value2
        }
      })
      return items
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving all items");
    }
  }

  async cutResultByAmountAndPage(amount: string, page: string, Array: Array<{
  dataValues: {
        id: number,
        name: string,
        lastname: string,
        fullName: string
    
    }
  }>, search: string | undefined){
    try {
      if(!search){
        const length = Array.length
        const start = (Number(page) - 1) * Number(amount)
        const res = Array.splice(start, Number(page) * Number(amount))
        return {users: res, total: length, page: Number(page), amount: res.length, start: start}
      }else{
        const start = (Number(page) - 1) * Number(amount)
        const filteredArray = Array.filter((item) =>
        item.dataValues.fullName.toLowerCase().includes(search.toLowerCase()) // Convert fullName to lowercase for comparison
      );
      const res = filteredArray.slice(start, Number(page) * Number(amount))
        return {
          users: res,
          total: filteredArray.length,
          page: Number(page),
          amount: res.length,
          start: start,
        };
      }

    } catch (error) {
      console.error(error);
      throw new Error("Error cutting items");
    }
  }

  async getById(id: string){
    try {
        const item = await this.model.findByPk(id);
        return item;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving item");
    }
  }

  async getByParameter(parameter: string, value: string){
    try {
        const item = await this.model.finSidOne({
          where: {
            [parameter]: value
          }
        });
        return item;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving item");
    }
  }

  async update(id: string, data: any) {
    try {
        let updatedItem = await this.model.findByPk(id);
        updatedItem = await updatedItem?.update(data);
        return updatedItem
    } catch (error) {
        console.error(error);
        throw new Error("Error updating item");
    }
  }

  async updateByParameters(id: string, data: string, parameter: string) {
    try {
        let updatedItem = await this.model.findByPk(id);
        updatedItem = await updatedItem?.update({[parameter]: data});
        return updatedItem
    } catch (error) {
        console.error(error);
        throw new Error("Error updating item");
    }
  }

  async delete(id: number) {
    try {
        const deletedItem = await this.model.findByPk(id);
        const result = await deletedItem?.destroy();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting item");
    }
  }

  async deleteUser(id: number, parameter: string, data: boolean | string) {
    try {
        const foundUser = await this.model.findByPk(id);
        const updateProperties = { [parameter]: data}
        const result = await foundUser?.update(updateProperties);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting item");
    }
  }


  async createTable(){
    try {
        await this.model.sync({force: true});
        console.log(`Table ${this.model.name} created successfully.`);
    } catch (error) {
        console.error(error);
        throw new Error(`Error creating table ${this.model.name}`);
    }
  }
}

export { CRUD as CRUDPostgreSQL}