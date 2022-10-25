import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useCallback, useEffect, useState} from "react";
import * as url from "url";


const AvailableMeals = () => {
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);

  const fetchMealsHandler = useCallback( async () =>{
    setIsLoading(true);
    const url = 'https://food-order-maximilian-react-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json';
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok){
        throw new Error('something went wrong');
      }
      const data = await response.json();
      let loadedMeals = [];
      console.log(data);
      for (const dataKey in data) {
        loadedMeals.push({
          id:dataKey,
          name:data[dataKey].name,
          description:data[dataKey].description,
          price:data[dataKey].price
        })
      }
      console.log(loadedMeals);
      setMeals(loadedMeals);
      setIsLoading(false)
    }catch (error){
      setError(error.message)
      setIsLoading(false)
      // console.log(error);
    }
  },[])


  useEffect(()=>{
    fetchMealsHandler();
  },[])

if(isLoading){
  return <section className={classes.MealsLoading}><p>loading ....</p></section>
}
if (error){
  return <section className={classes.MealsLoading}>{error}</section>
}
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
