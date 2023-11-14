import { Request, Response, NextFunction } from 'express';
import csvService from '../services/csvService';


interface Csv {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

const postFilesCsv = async (req: Request, res: Response, next: NextFunction) => {
    const ret = csvService.writeCSVJsonFile(req);

    if(ret) return res.status(200).json({ message: "File sucessulf save"});
    return res.status(500).json({ message: "Error on save file"});
};

const getApiUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query);
    return csvService.readCSVJsonFile(req.query, res);
};





export default { postFilesCsv, getApiUsers };