import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };
    

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: -10,
        };
    

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    return (
        <tr>
        <td>{props.name}</td>
        <td>{currency}{props.cost}</td>
        <td>
                <button 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                        height: '30px',
                        width: '30px',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        backgroundColor: 'lightgreen',
                        fontSize: '35px' // Adjust the font size here
                    }} 
                    onClick={event => increaseAllocation(props.name)}
                >
                    <b>+</b>
                </button>
            </td>
        <td><button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                        height: '30px',
                        width: '30px',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        fontSize: '35px' // Adjust the font size here
                    }} 
                    onClick={event=> decreaseAllocation(props.name)}>
                        <b>-</b>
                        </button></td>
        <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
