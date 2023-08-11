import { WorkshopService } from "../service/index.service";
import { Request, Response } from "express";

const Service = WorkshopService.getInstance();
const controller:
    {
        getWorkshops: (req: Request, res: Response) => Promise<void>,
        getWorkshopById: (req: Request, res: Response) => Promise<void>,
        createWorkshop: (req: Request, res: Response) => Promise<void>,
        updateWorkshop: (req: Request, res: Response) => Promise<void>
        deleteWorkshop: (req: Request, res: Response) => Promise<void>,
    } = {
    getWorkshops: async (req: Request, res: Response) => {
        try {
            const workshops = await Service.getWorkshops();

            if (workshops) {
                res.status(200).json({ workshops })
            } else {
                res.status(400).json({ message: "error user signup, check body send or repeted unique values" })
            }
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: "Unknown error" })
        }
    },
    getWorkshopById: async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id
            if (!id) {
                res.status(400).json({ error: "id are require paremeters" })
            }
            else {
                const workshop = await Service.getWorkshopById(id);
                if (workshop) {
                    res.status(200).json({ workshop })
                }
                else {
                    res.status(400).json({
                        data: false, message: "error user login", token: null
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
    },
    createWorkshop: async (req: Request, res: Response) => {
        const workshop: {
            workshopNumber: number;
            dateStart: Date;
            dateEnd: Date;
            inviteId: number;
            dayOne: number;
            dayTwo: number;
            dayThree: number;
            dayFour: number;
            dayFive: number;
            daySix: number;
            daySeven: number;
            dayEight: number;
            dayNine: number;
            dayTen: number;
            dayEleven: number;
            dayTwelve: number;
        } = req.body
        try {
            const newWorkshop = await Service.createWorkshop(workshop);
            if (newWorkshop) {
                res.status(201).json({ message: "created workshop" })
            }
            else {
                res.status(400).json({
                    data: false, message: "error"
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
    },
    updateWorkshop: async (req: Request, res: Response) => {
        const idWorkshop: string = req.params.id
        const workshop: {
            workshopNumber: number;
            dateStart: Date;
            dateEnd: Date;
            inviteId: number;
            dayOne: number;
            dayTwo: number;
            dayThree: number;
            dayFour: number;
            dayFive: number;
            daySix: number;
            daySeven: number;
            dayEight: number;
            dayNine: number;
            dayTen: number;
            dayEleven: number;
            dayTwelve: number;
        } = req.body
        try {
            const updatedWorkshop = await Service.updateWorkshop(idWorkshop, workshop)
            if (updatedWorkshop) {
                res.status(200).json({ updatedWorkshop })
            }
            else {
                res.status(400).json({ message: "error update workshop" })
            }
        } catch (error) {
            res.status(404).json({
                error: "Unknown error"
            })
        }
    },
    deleteWorkshop: async (req: Request, res: Response) => {
        const id: string = req.params.id
        try {
            const deleteUser = await Service.deleteWorkshop(id)
            if (deleteUser) {
                res.status(200).json({ message: "User Delete" })
            } else {
                res.status(400).json({ message: "error" })
            }
        } catch (error) {
            res.status(404).json({
                error: "Unknown error"
            })
        }
    }
};



export { controller as workshopController };