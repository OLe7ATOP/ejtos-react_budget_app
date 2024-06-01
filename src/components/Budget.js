import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Budget.css';
const Budget = () => {
    const { budget, expenses, dispatch } = useContext(AppContext); // Получаем expenses из контекста
    const [newBudget, setNewBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0); // Определяем totalExpenses

    const handleBudgetChange = (event) => {
        const updatedBudget = parseInt(event.target.value);

        if (updatedBudget < totalExpenses) {
            alert('You cannot reduce the budget value lower than the spending');
        } else {
            setNewBudget(updatedBudget);
            dispatch({
                type: 'SET_BUDGET',
                payload: updatedBudget,
            });
        }
        const cur = document.getElementById("input_currency");
        
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: £{budget}</span>
            <form>
                <input
                    id="input_budget"
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}
                />
                
            </form>
            <form>
                <select  id="input_currency">
                <option defaultValue>Select currency</option>
                <option value="$" class="cur_opt">$ Dollar</option>
                <option value="£" >£ Pound</option>
                <option value="€" >€ Euro</option>
                <option value="₹" >₹ Ruppee</option>
                </select>
            </form>
        </div>
    );
};

export default Budget;
