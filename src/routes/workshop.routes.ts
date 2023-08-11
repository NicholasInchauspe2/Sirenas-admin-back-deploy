import { Router } from "express";
import { workshopController } from "../controller/workshop.controller";
const router = Router();

// Traigo todos los talleres
router.get("/", workshopController.getWorkshops);

// Traigo un taller por id 
router.get("/:id", workshopController.getWorkshopById);

// Creo un nuevo taller
router.post("/", workshopController.createWorkshop)

// Edito un taller
router.put("/:id", workshopController.updateWorkshop)

// Elimino un taller
router.delete("/:id", workshopController.deleteWorkshop)

export { router as workshopRouter }
