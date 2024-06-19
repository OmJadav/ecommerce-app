import React from "react";

export const InputFieldForm = ({
  labelName,
  id,
  inputType,
  placeholder,
  formHook,
  inputProps,
}) => {
  const borderFocusColor = "focus:border-indigo-500";
  return (
    <>
      {labelName && (
        <label
          htmlFor={id}
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >
          {labelName}
        </label>
      )}
      <div className="flex ">
        <input
          id={id}
          type={inputType}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 ${borderFocusColor}`}
          placeholder={placeholder}
          {...inputProps}
          defaultValue={""}
          {...formHook}
        />
      </div>
    </>
  );
};
