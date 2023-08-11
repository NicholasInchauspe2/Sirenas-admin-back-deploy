import { UserService } from "../service/user.service";
import { Request, Response } from "express";
import { FileRequest } from "../interfaces/user.interfaces";
import s3Client from "../config/awsS3";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import config from "../config/dbconfig";
import crypto from 'crypto';

const Service = UserService.getInstance();
const controller:
    {
        getAll: (req: Request, res: Response) => Promise<void>,
        getUserById: (req: Request, res: Response) => Promise<void>,
        getUsers: (req: Request, res: Response) => Promise<void>,
        singUp: (req: Request, res: Response) => Promise<void>,
        singin: (req: Request, res: Response) => Promise<void>,
        singUpAdmin: (req: Request, res: Response) => Promise<void>,
        findUserbyIGUsername: (req: Request, res: Response) => Promise<void>,
        deleteUsers: (req: Request, res: Response) => Promise<void>,
        postImage: (req: FileRequest, res: Response) => Promise<void>,
    } = {
        postImage: async(req: FileRequest, res: Response) => {
            try {
                if (!req.file  || !req.user) {
                     res.status(400).json({ error: 'No se ha proporcionado una imagen' });
                    }else{
        
                        const AWS_BUCKET = config.development.aws_bucket as string;
                        const AWS_USE_PATH_STYLE_ENDPOINT = config.development.aws_use_path_style_endpoint as string;
        
                        const fileContent = req.file.buffer;
                        const imageFileName = req.file.originalname;
        
                        function generateUniqueETag(fileContent: Buffer): string {
                          const hash = crypto.createHash('md5').update(fileContent).digest('hex');
                          return hash;
                        }
        
                        const uniqueETag = generateUniqueETag(fileContent);
        
                            const uploadParams = {
                                Bucket: AWS_BUCKET, // Reemplazar con el nombre de tu bucket en AWS S3
                                Key: `sirenas/uploads/user/user-${req.user.id}/avatar/profile_image-user-${req.user.id}`,
                                Body: fileContent,
                                ACL: 'public-read', // Opcional, establece los permisos de acceso del archivo en S3
                                ContentType: "image/jpeg",
                                ContentDisposition: "inline",
                                ETag: uniqueETag,
                                };
                            
                                try {
                                const command = new PutObjectCommand(uploadParams);
                                await s3Client.send(command);
        
        
                                const data : string = `https://${AWS_BUCKET}.s3.amazonaws.com/${uploadParams.Key}`
                                const parameter : string = 'avatar'
                               
                                
                                const updateUser = await Service.updateUser(String(req.user.id), parameter, data)
                                
                            
                                res.status(200).json({data: true, message: "put user avatar", updateUser})
                                } catch (err) {
                                console.error('Error al cargar la imagen en S3:', err);
                                res.status(500).json({ error: 'Error al cargar la imagen en S3' });
                                }
                    }
        }   catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
        },
    deleteUsers: async(req: Request, res: Response) => {
        try {
            const array : Array<{id: number}> = req.body.users
            if(!array){
                res.status(400).json({ error: "users are necessary" }) 
            }else{
                const deletedUser = await Service.deleteUsers(array)
                if(deletedUser){
                    res.status(200).json({data: true, message: "Delete users", users: deletedUser})
                }else{
                    res.status(400).json({data: false, message: "error deleting users", users: null})
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
    },
    singUp: async (req: Request, res: Response) => {
        try {

            const user: { email: string, password: string } = req.body
            if (!user.password || !user.email) {
                res.status(400).json({ error: "User is necesarry" })
            }
            else {
                const newUser = await Service.singUp(user);
                if (newUser) {
                    res.status(201).json({ data: true, message: "created user" })
                }
                else {
                    res.status(400).json({
                        data: false, message: "error user signup, check body send or repeted unique values"
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
    singin: async (req: Request, res: Response) => {
        try {
            const { email, password }: { email: string, password: string } = req.body
            if (!email || !password) {
                res.status(400).json({ error: "email and password are require paremeters" })
            }
            else {
                const logUser = await Service.singin(email, password);
                if (logUser) {
                    res.status(201).json({ data: true, message: "Log user", token: logUser })
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
    singUpAdmin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.status(400).json({ error: "email and password are require paremeters" })
            }
            else {
                const newUser = await Service.singUpAdmin(email, password);
                if (newUser) {
                    res.status(201).json({ data: true, message: "created user" })
                }
                else {
                    res.status(400).json({
                        data: false, message: "error user signup, check body send or repeted unique values"
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
    getUsers: async (req: Request, res: Response) => {
        let amount: string = req.params.amount
        let page: string = req.params.page
        let search: string | undefined = req.query.search as string;
        try {
            (!amount || Number(amount) < 10 || Number(amount) > 25) ? (amount = '15') : (null);
            (!page || Number(page) < 1) ? (page = '1') : (null);
            const allUser = await Service.allUser(amount, page, search)
            if (allUser) {
                res.status(200).json({ data: true, users: allUser, message: "Get all users by parameters" })
            }
            else {
                res.status(400).json({
                    data: false, message: "error get all users"
                })
            }

        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
    },
    getUserById: async (req: Request, res: Response) => {
        const id: string = req.params.id
        try {
            const foundUser = await Service.findOne(id)
            if (!foundUser) {
                res.status(400).json({ data: false, user: null, message: "error get user by id" })
            } else {
                res.status(200).json({ data: true, user: foundUser, message: "Get all users by parameters" })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
    },
    findUserbyIGUsername: async (req: Request, res: Response) => {
        const username: string = req.params.username;
        try {
            const foundUser = await Service.findByIGUsername(username);
            if (foundUser) {
                res.json({ data: true, message: "username found" }); //user: foundUser
            } else {
                res.json({ data: false, user: null, message: "username not found" });
            }
        } catch (error) {
            console.log(error);
            res.json({ data: false, user: null, message: "error get username" });
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            console.log("llego controller");
            const allUser = await Service.allUserTest()
            res.send(allUser)
        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Unknown error"
            })
        }
    }
}

    export { controller as userController };
