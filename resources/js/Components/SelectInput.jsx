import React, { forwardRef, useEffect, useRef } from 'react';

const SelectInput = forwardRef(({ className = '', isFocused = false, children, ...props }, ref) => {
    const selectRef = ref || useRef();

    useEffect(() => {
        if (isFocused) {
            selectRef.current.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            ref={selectRef}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
        >
            {children}
        </select>
    );
});

export default SelectInput;
