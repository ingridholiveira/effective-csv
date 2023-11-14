/**
 *
 * Home
 *
 */

import { Box, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from "@chakra-ui/react";
import InputSearch from "../../components/InputSearch/InputSearch";
import InputFile, { IFile } from "../../components/InputFile/InputFile";
import { ChangeEvent, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

type FormData = {
  name: string;
};

interface IGenericForm {
  files: IFile[];
}

const Home = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
  });
  const [users, setUsers] = useState<any>();
  const [search, setSearch] = useState<string>('');
  const allowedExtensions = "text/csv";

  const fileSchema = yup
    .mixed()
    .test("type", "Selecione um arquivo do tipo .csv!", (value?: IFile) => {
      const isInvalid = !allowedExtensions.includes(value?.type!);
      console.log(value?.type!);
      if (isInvalid && value) {
        console.log("Formato nao permitido");
        return false;
      }

      return true;
    });

  const schema = yup.object().shape({
    files: fileSchema,
  });

  const {
    setValue,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<IGenericForm>({
    // resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const file = event?.target?.files[0];

      await fileSchema?.validate(file);

      append({
        name: file.name,
        size: String(file.size),
        type: file.type,
        file,
      });

      const { data } = await axios.post(
        "http://localhost:3000/api/files",
        {
          file: file
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      loadCsvData();
    }
  };

  const loadCsvData = async () => {
   
    axios
      .get(`http://localhost:3000/api/users/?q=${search}`)
      .then((response) => {
        setUsers(response.data);
        const result = Object.fromEntries(response.data.map((value: any, index: any) => [index, value]))

        console.log(result)
      })
      .catch((err) => {
        setUsers(undefined);
      });
  };
  const onChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
   
  }

  const clickSearch = async () => {
    console.log('caiu');
    loadCsvData();
  }

  return (
    <>
      <Box maxWidth={"75rem"}>
        <InputFile
          label="Adicionar um novo arquivo"
          subLabel="Arquivo '.csv'"
          name="files"
          acceptValues={allowedExtensions}
          data-testid="input--upload"
          onChangeDoc={onChangeFile}
        />
        <InputSearch onChangeSearch={onChangeSearch} onSearch={clickSearch} />
      </Box>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {users?.map((item: any, index: number) => (        
            <Card>
              <CardHeader>{item.Name}</CardHeader>
              <CardBody>
                {item.Username}
              </CardBody>
              <CardFooter>{item.Telefone}</CardFooter>
            </Card>         
        ))}
         </SimpleGrid>
    </>
  );
};

export default Home;
