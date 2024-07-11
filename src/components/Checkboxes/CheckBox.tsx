import { useState } from 'react';
import CheckIcon from '../../pages/UiElements/CheckIcon';

const CheckBox = ({label = "", register, name}: any) => {
  const [isChecked, setIsChecked] = useState<boolean>(false); 
  return (
    <div>
      <label
        htmlFor="checkboxLabelTwo"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            name={name}
            type="checkbox"
            id="checkboxLabelTwo"
            className="sr-only"
            {...register(name)}
            onChange={(e : any) => {
              setIsChecked(!isChecked);
              console.log('ch',e)
              // onChange!(e);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span className={`opacity-0 ${isChecked && '!opacity-100'}`}>
              <CheckIcon/>
            </span>
          </div>
        </div>
          {label}
      </label>
    </div>
  );
};

export default CheckBox;
