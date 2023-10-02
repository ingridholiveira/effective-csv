/**
 *
 * InputFile
 *
 */

import { ChangeEvent } from "react";
import {
  AddIcon,
  AttachmentIcon,
  DeleteIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputProps,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
// import { DeleteIcon, DownloadPdfIcon, PdfIcon } from "assets/icons";
// import { MB_IN_KB } from "utils/constants";

export interface IFile {
  id?: string;
  name?: string;
  size?: string;
  type?: string;
  linkBy?: string;
  file?: File;
}

interface InputFileProps extends InputProps {
  file?: IFile;
  label?: string;
  subLabel?: string;
  required?: boolean;
  disabled?: boolean;
  onChangeDoc?: (arg0: ChangeEvent<HTMLInputElement>) => void;
  onDownloadDoc?: (id: string) => void;
  onDeleteDoc?: (id: string) => void;
  isListing?: boolean;
  acceptValues?: string;
}

const InputFile = ({
  onChangeDoc,
  onDownloadDoc,
  onDeleteDoc,
  file,
  label,
  subLabel,
  required,
  disabled,
  isListing = false,
  acceptValues,
  ...rest
}: InputFileProps) => {
  const styles: Record<string, SystemStyleObject> = {
    container: {
      w: "100%",
      p: "0.5rem",
      maxW: "25rem",
      border: "0.063rem solid",
      borderRadius: "0.5rem",
      borderColor: "#DBDBDB",
      background: "white",
      height: "auto",
      flexDir: "column",
      justifyContent: "end",
      display: "flex",
    },
    content: { alignItems: "center", justifyContent: "space-between" },
    contentFile: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "0.050rem solid",
      borderRadius: "0.5rem",
      borderColor: "#DBDBDB",
      w: "5.625rem",
      height: "4.063rem",
    },

    firstContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      w: "100%",
    },
    cardText: { marginLeft: "0.438rem", width: "100%" },
    cardTextAdd: {
      marginLeft: "0.438rem",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    fileName: { fontSize: "1rem", textColor: "black", textAlign: "start" },
    fileSize: {
      fontSize: "0.875rem",
      fontWeight: "normal",
      textColor: "black",
    },
    buttonIcons: {
      display: "flex",
      paddingBottom: "1.875rem",
      flexDirection: "row-reverse",
      alignContent: "flex-end",
      flexWrap: "wrap",
    },
  };

  const MB_IN_KB = 1024;

  const onDownloadFile = async (event: string) => {
    onDownloadDoc?.(event);
  };
  const onDeleteFile = async (event: string) => {
    onDeleteDoc?.(event);
  };
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    onChangeDoc?.(event);
  };

  return (
    <>
      {file && (
        <FormControl>
          <Flex sx={styles.container}>
            <Flex sx={styles.content}>
              <Box sx={styles.firstContainer}>
                <Box sx={styles.contentFile}>
                  <AttachmentIcon />
                </Box>
                <Box sx={styles.cardText}>
                  <Text sx={styles.fileName}>{file.name}</Text>
                  <Text sx={styles.fileSize}>
                    {(Number(file.size) / MB_IN_KB).toFixed(2)}mb
                  </Text>
                </Box>
              </Box>
              {isListing && (
                <IconButton
                  sx={styles.buttonIcons}
                  aria-label={"Baixar arquivo"}
                  variant="unstyled"
                  icon={<DownloadIcon />}
                  data-testid={"download"}
                  onClick={() => onDownloadFile?.(file?.id!)}
                />
              )}
              {!isListing && (
                <IconButton
                  sx={styles.buttonIcons}
                  aria-label={"Excluir arquivo"}
                  variant="unstyled"
                  icon={<DeleteIcon />}
                  data-testid={"delete"}
                  onClick={() => onDeleteFile?.(file?.id!)}
                />
              )}
            </Flex>
          </Flex>
        </FormControl>
      )}

      {!file && !isListing && (
        <Flex
          as="label"
          htmlFor="upload"
          sx={styles.container}
          cursor="pointer"
        >
          <Flex sx={styles.content}>
            <Box sx={styles.firstContainer} data-testid="button--upload">
              <Box sx={styles.contentFile}>
                <label htmlFor="upload">
                  <AddIcon />
                </label>
              </Box>
              <Box sx={styles.cardText}>
                <Text sx={styles.fileName}>
                  <label htmlFor="upload">{label}</label>
                </Text>

                <Text sx={styles.fileSize}>{subLabel}</Text>
              </Box>
            </Box>

            <Input
              type="file"
              id="upload"
              data-testid="input--upload"
              required={required}
              disabled={disabled}
              {...rest}
              onChange={onChangeFile}
              display="none"
              accept={acceptValues}
              variant={"unstyled"}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default InputFile;
