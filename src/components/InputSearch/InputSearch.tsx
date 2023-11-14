/**
 *
 * InputSearch
 *
 */

import { Button, Flex, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

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
  onChangeSearch?: (arg0: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}


const InputSearch = ({onChangeSearch, onSearch}: InputSearchProps) => {
  const onChangeText = async (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch?.(event);
  };

  return (
    <>
      <Flex gap={4} direction="row" align="center" padding={8}>
        <Input onChange={onChangeText} />
        <Button
          colorScheme="green"
          variant="outline"
          size="md"
          onClick={onSearch}
        >
          Search
        </Button>
      </Flex>
    </>
  );
};

export default InputSearch;
