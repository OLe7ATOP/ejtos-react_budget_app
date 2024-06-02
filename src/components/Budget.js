import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';




const Budget = () => {
    const { budget, expenses, currency, dispatch } = useContext(AppContext); // Получаем expenses из контекста
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
    }

  

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}
            
                <input
                    id="input_budget"
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}
                />
                
           
            </span>
        </div>
    );
};

export default Budget;
