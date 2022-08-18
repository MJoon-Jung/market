import { useState } from 'react';

function useInput(initalValue: any) {
  const [value, setValue] = useState(initalValue);
  return [value, setValue];
}

export default useInput;
