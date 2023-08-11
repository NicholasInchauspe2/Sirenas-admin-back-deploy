interface Workshop {
    id?: number;
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
}

interface WorkshopService {
    getWorkshops(): Promise<Array<Workshop> | null>;
    getWorkshopById(id: string): Promise<Workshop | null>;
    createWorkshop(workshop: Workshop): Promise<boolean>;
    updateWorkshop(id: string, workshop: Workshop): Promise<Workshop | null>;
    deleteWorkshop(id: string): Promise<boolean>;
}

export { Workshop, WorkshopService };