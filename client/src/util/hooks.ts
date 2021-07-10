import { useState } from 'react';

export function useForm<T>(callback: Function, initialState: T) {
  const [value, setValue] = useState<T>(initialState);

  const handleOnChange = ({
    target: { name, value: val },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [name]: val });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback();
  };

  return { handleOnChange, handleOnSubmit, value };
}
