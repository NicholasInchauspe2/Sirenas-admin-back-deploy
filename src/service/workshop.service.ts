import { DaoFactory } from "../models/factory";
import { Workshop, WorkshopService } from '../interfaces/index.interfaces';

const dao = DaoFactory.getWorkshopDao();

let instanciaWorkshop: null | Service = null;

class Service implements WorkshopService {

    static getInstance = () => {
        if (!instanciaWorkshop) {
            instanciaWorkshop = new Service();
        }
        return instanciaWorkshop;
    }

    async createWorkshop(workshop: Workshop) {
        try {
            const res = await dao.createWorkshop(workshop);
            return !!res; // Devuelve true si res tiene un valor, de lo contrario devuelve false
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getWorkshops() {
        try {
            const workshops = await dao.getWorkshops();
            return workshops || null;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getWorkshopById(id: string) {
        try {
            const workshop = await dao.getWorkshopById(id);
            return workshop || null;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateWorkshop(id: string, workshop: Workshop) {
        try {

            const updatedWorkshop = await dao.updateWorkshop(id,workshop);
            if (updatedWorkshop) {
                // Actualiza el taller con la información del parámetro workshop
                // (Asumiendo que dao.getWorkshopById devuelve el taller encontrado)
                // Lógica para la actualización...
                return updatedWorkshop;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteWorkshop(id: string) {
        try {
            const deleteWorkshop = await dao.deleteWorkshop(id);
            return !!deleteWorkshop; // Devuelve true si deleteWorkshop tiene un valor, de lo contrario devuelve false
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export { Service as WorkshopService };
