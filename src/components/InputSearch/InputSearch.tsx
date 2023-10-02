/**
 *
 * InputSearch
 *
 */

import { Button, Flex, Input } from "@chakra-ui/react";

export interface IOption {
  id?: string | number | boolean;
  value?: string | number | boolean;
  label?: string;
}

export interface InputSearchProps {
  csvContent?: IOption[];
  results?: IOption[];
  notFoundText?: string;
  placeholder?: string;
  setResult?: (options: IOption[]) => void;
}

const InputSearch = (props: InputSearchProps) => {
  return (
    <>
      <Flex gap={4} direction="row" align="center" padding={8}>
        <Input />
        <Button
          colorScheme="green"
          variant="outline"
          size="md"
          onClick={() => console.log("procurou")}
        >
          Search
        </Button>
      </Flex>
    </>
  );
};

export default InputSearch;
