import { CRUDPostgreSQL } from "../../container/crud.container";
import { WorkshopSchema } from "../schema/index.schema";
import { Workshop } from "../../interfaces/index.interfaces";

class WorkshopDAO extends CRUDPostgreSQL<any> {
    constructor() {
        super(WorkshopSchema);
    }

    // Implementación de las funciones del CRUD

    async createWorkshop(workshop: Workshop) {
        try {
            const createdWorkshop = await this.create(workshop);
            return !!createdWorkshop; // Devuelve true si se creó el taller, de lo contrario, devuelve false
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getWorkshops() {
        try {
            const workshops = await this.getAll();
            return workshops || null;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getWorkshopById(id: string) {
        try {
            const workshop = await this.getById(id);
            return workshop || null;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateWorkshop(id: string, workshop: Workshop) {
        try {
            const updatedWorkshop = await this.update(id, workshop);
            return updatedWorkshop;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteWorkshop(id: string) {
        try {
            const deletedWorkshop = await this.delete(Number(id));
            return !!deletedWorkshop; // Devuelve true si se eliminó el taller, de lo contrario, devuelve false
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export { WorkshopDAO as WorkshopDaoPostgresSQL };