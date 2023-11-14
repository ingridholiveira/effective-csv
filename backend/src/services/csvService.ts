import fs from 'fs';
const dataPath = 'data/csvData.json';

function readCSVFile(file: any): any {
    let newObj: any[] = [];
    const data = fs.readFileSync(`${file.destination}/${file.filename}`, 'utf8');
    const linhas = data.split(/\r?\n/);
    let props: string[];
    linhas.forEach((linha, index) => {
        const values = linha.split(';');
        if (index === 0) {
            props = values;
        } else {
            let obj: string = '';
            values.forEach((val, idx) => {
                obj = obj +
                    `"${props[idx]}":"${val}",`;
            });
            newObj.push(JSON.parse('{' + obj.slice(0, -1) + '}'));

        }
    });
    fs.writeFileSync(dataPath, JSON.stringify(newObj), 'utf8');

    return true;

}

const writeCSVJsonFile = (req: any): any => {
    console.log(req.file);
    const csvData = readCSVFile(req.file);
    return csvData
}

const readCSVJsonFile = (params: any, res: any): Response => {
    const data = fs.readFileSync(dataPath, 'utf8')
    if (!data) {
        res.status(500).send(JSON.parse('{"message": "Error on read file"}'));
        return res
    }
    const csvData : Object[] = JSON.parse(data);
    let ret : Object[] = [];
    if(params?.q && params?.q !== ''){
    csvData.forEach((element, index) => {
       Object.getOwnPropertyNames(element).forEach((val)=>{
            const prop = val as keyof typeof element;
            if(element[prop].toString().toUpperCase().includes(params?.q.toUpperCase()) && ret.indexOf(element) === -1) ret.push(element);
       });
    });
    }else ret = csvData;
    res.send(ret);
    return res;
}
export default { writeCSVJsonFile, readCSVJsonFile };