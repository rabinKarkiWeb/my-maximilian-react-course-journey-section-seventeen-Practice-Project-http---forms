import { useState} from "react";

const useInput = (validityFn) => {
	const [inputValue, setInputValue] = useState('');
	const [inputTouched, setInputTouched] = useState(false);
	let isValid;
	isValid = !!validityFn(inputValue);
	let isInvalid = false;
	const inputChangeHandler = (event) => {
		setInputValue(event.target.value);
	}

	const inputBlurHandler = ()=>{
		setInputTouched(true);
	}
	if (!isValid && inputTouched){
		isInvalid = true;
	}
	const reset = () => {
		setInputTouched(false);
		setInputValue('');
	}

	return {
		inputValue,
		inputChangeHandler,
		inputBlurHandler,
		isValid,
		isInvalid,
		reset
	}
}
export default useInput;