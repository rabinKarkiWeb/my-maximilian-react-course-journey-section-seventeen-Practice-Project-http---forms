import classes from './Checkout.module.css';
import useInput from "../../hooks/use-input";

const notEmpty = value => value.trim() !== '';
const notFiveChars = value => value.trim().length > 4;


const Checkout = (props) => {
	const {
		inputValue:name,
		inputChangeHandler:nameChangeHandler,
		inputBlurHandler:nameBlurHandler,
		isValid:nameIsValid,
		isInvalid:nameIsInvalid
	} = useInput(notEmpty);
	const {
		inputValue:postal,
		inputChangeHandler:postalChangeHandler,
		inputBlurHandler:postalBlurHandler,
		isValid:postalIsValid,
		isInvalid:postalIsInvalid
	} = useInput(notFiveChars);
	const {
		inputValue:city,
		inputChangeHandler:cityChangeHandler,
		inputBlurHandler:cityBlurHandler,
		isValid:cityIsValid,
		isInvalid:cityIsInvalid
	} = useInput(notEmpty);
	const {
		inputValue:street,
		inputChangeHandler:streetChangeHandler,
		inputBlurHandler:streetBlurHandler,
		isValid:streetIsValid,
		isInvalid:streetIsInvalid
	} = useInput(notEmpty);


	const confirmHandler = (event) => {
		event.preventDefault();

		const formIsValid = nameIsValid && cityIsValid && streetIsValid && postalIsValid;
		if (!formIsValid){
			return;
		}

		props.onConfirm({
			name,
			street,
			postal,
			city,
		})
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={`${classes.control} ${nameIsInvalid && classes.invalid}`}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
				{nameIsInvalid && <p>please enter a valid name</p>}
			</div>
			<div className={`${classes.control} ${streetIsInvalid && classes.invalid}`}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' onChange={streetChangeHandler} onBlur={streetBlurHandler} />
				{streetIsInvalid && <p>please enter a valid street</p>}

			</div>
				<div className={`${classes.control} ${postalIsInvalid && classes.invalid}`}>

				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' onChange={postalChangeHandler} onBlur={postalBlurHandler} />
				{postalIsInvalid && <p>please enter a valid postal code</p>}
			</div>
			<div className={`${classes.control} ${cityIsInvalid && classes.invalid}`}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' onChange={cityChangeHandler} onBlur={cityBlurHandler} />
				{cityIsInvalid && <p>please enter a valid city</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;