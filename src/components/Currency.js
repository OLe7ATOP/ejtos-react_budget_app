import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import "./Currency.css";




const Currency = () =>{
    const {currency, dispatch} = useContext(AppContext);
    const [newcurrency, setNewCurrency] = useState(currency);
    const handleCurrencyChange = (event) =>{
        const updatedCurrency = event.target.value;
        setNewCurrency(updatedCurrency);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: updatedCurrency,
        });
    }

    

    return(
        <form>
                <select  id="input_currency" value ={newcurrency} onChange={handleCurrencyChange}>
                <option defaultValue>Select currency</option>
                 <option value="$">$ Dollar</option>
                <option value="£" >£ Pound</option>
                <option value="€" >€ Euro</option>
                <option value="₹" >₹ Ruppee</option>
                </select>
        </form>
    );
}


export default Currency;