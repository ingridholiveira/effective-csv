/**
 *
 * Home
 *
 */

import { Box } from "@chakra-ui/react";
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

type User = {
  avatar_url: string;
  url: string;
  followers: string;
  location: string;
  name: string;
};

interface IGenericForm {
  files: IFile[];
}

const Home = () => {
  // const fileDefault = [
  // 	file1: {
  // 		id: '3',
  // 		name: 'Analise_Critica_3.pdf',
  // 		size: 5,
  // 		type: 'application/pdf',
  // 		linkBy: 'https://google.com.br',
  // 	},
  // ];

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<FormData>({
    name: "",
  });
  const [user, setUser] = useState<User>();
  const allowedExtensions = ".csv";

  const fileSchema = yup
    .mixed()
    .test("type", "Selecione um arquivo do tipo .csv!", (value?: IFile) => {
      const isInvalid = !allowedExtensions.includes(value?.type!);

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


      //mudar para type user
      const { data } = await axios.post(
        "https://httpbin.org/post",
        {
          firstName: "Fred",
          lastName: "Flintstone",
          orders: [1, 2, 3],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      //   axios.postForm("https://httpbin.org/post", {
      //     my_field: "my value",
      //     my_buffer: new Blob([1, 2, 3]),
      //     my_file: fileInput.files, // FileList will be unwrapped as sepate fields
      //   });
    }

    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteFile = (value: IFile, index: number) => {
    // if (!isDisabled) {
    // eslint-disable-next-line no-console
    console.log(value);
    remove(index);
    // }
  };

  // const handleDownloadFile = (file: IFile) => {
  // 	// eslint-disable-next-line no-console
  // 	console.log('download file', file);
  // };

  // const handleDeleteFile = (file: IFile) => {
  // 	// eslint-disable-next-line no-console
  // 	console.log('delete file', file);
  // };

  // const handleDelete = () => {
  // 	// eslint-disable-next-line no-console
  // 	console.log('confirmou exclusão');
  // };

  // const onSubmit = (values: IGenericForm) => {
  // 	// eslint-disable-next-line no-console
  // 	console.log('values', values);
  // 	reset();
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.name}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setUser(undefined);
      });
  };

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
        <InputSearch />
        {fields?.map((item, index) => (
          <Box key={item.id} display="flex">
            <Controller
              name="files"
              control={control}
              render={() => (
                <InputFile
                  file={item}
                  data-testid="input--upload"
                  onDeleteDoc={() => handleDeleteFile(item, index)}
                  //   disabled={isDisabled}
                />
              )}
            />
          </Box>
        ))}
      </Box>
      {/*<Box>
				<Box sx={styles.container}>
					<Grid sx={styles.fieldsContent}></Grid>
				</Box>
				<Grid as="form" onSubmit={handleSubmit(onSubmit)} sx={styles.fieldsContent}>
					{fields?.map((item, index) => (
						<Box key={item.id} display="flex">
							<Controller
								name="file"
								control={control}
								render={() => <InputFile file={item} data-testid="input--upload" onDeleteDoc={() => remove(index)} />}
		 <Container>
				<Box mb={5} as="form" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="files"
						control={control}
						render={() => (
							<FileModal
								label="Enviar"
								subLabel="'.pdf', '.docx', '.xlsx' ou '.pptx'"
								acceptValues={allowedExtensions}
								onChangeDoc={handleChangeDoc}
								error={errors?.files}
							/>
						)}
					/>
					<Button type="submit" ml={3}>
						clickme
					</Button>
				</Box>
				<Box mb={5} as="form" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="files"
						control={control}
						render={() => (
							<FileModal
								defaultValues={modalFileDefault}
								label="Visualizar"
								subLabel="'.pdf', '.docx', '.xlsx' ou '.pptx'"
								acceptValues={allowedExtensions}
								onDownload={handleDownloadFile}
								onDelete={handleDeleteFile}
							/>
						)}
					/>
				</Box>

				<CustomModal
					icons={[{ type: 'info' }]}
					title="Aviso!"
					body="O formato de todos os arquivos devem ser: '.pdf', '.docx', '.xlsx' ou '.pptx' de no máximo 10mb."
					isOpen={isOpen}
					onClose={onClose}
					actions={[
						{
							label: 'Entendido',
							type: 'primary',
							onClick: onClose,
							datatestid: 'button--confirm',
						},
					]}
				/>
			</Container> */}
    </>
  );
};

export default Home;
