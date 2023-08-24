import React, {useEffect, useState} from 'react';
import './Home.css';
// import Card from './components/Card';
// import Modal from './components/Modal';

const Home = ({token}) => {
    const [todos, setTodos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddCard = (card) => {
        setCards([...cards, card]);
        setIsModalOpen(false);
    };
      

    useEffect(() => {
        // fetchTodos();
    }, []);


    const handleEditClick = (todo) => {
        const newTodos = todos.map(todoFilter => {
            return todoFilter.id === todo.id ? {...todoFilter, "edit": true} : todoFilter
        });
        setTodos(newTodos);
    };

    const fetchTodos = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/user-todos/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        const modifiedData = data.map(itemData => {
            itemData.edit = false;
            return itemData
        })

        setTodos(modifiedData);
    };

    const handleAddTodo = async () => {
        //colocar no if do response
        setShowAddForm(false);

        // Create a new todo item
        const response = await fetch('http://127.0.0.1:8000/api/todo/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: newTodoTitle, description: newDescription, completed: false}),
        });

        // Refresh the todo list if the request was successful
        if (response.ok) {
            setNewTodoTitle(''); // Clear the input field
            setNewDescription(''); // Clear the input field
            setShowAddForm(false); // Hide the add form
            fetchTodos(); // Refresh the todo list
        }
    };

    const handleEditTodo = (todo, e) => {
        const eventName = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        console.log(value);
        const newTodos = todos.map(todoFilter => {
            return todoFilter.id === todo.id ? {...todoFilter, [eventName]: value} : todoFilter
        });

        setTodos(newTodos);
    };

    const handleDeleteTodo = async (todo) => {
        const response = await fetch(`http://127.0.0.1:8000/api/todo/${todo.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            fetchTodos(); // Refresh the todo list
        }
    };

    const handleSaveEdit = async (todo) => {
        const response = await fetch(`http://127.0.0.1:8000/api/todo/${todo.id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        if (response.ok) {
            fetchTodos(); // Refresh the todo list
        }
    };


    const handleCancelEdit=() => {
        fetchTodos();
    }

    return (
        <div className="homeContainer">
            <h2>Todo List</h2>
            <button onClick={() => setShowAddForm(true)}>Adicionar Nova Tarefa</button>
            {showAddForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Crie uma nova tarefa</h3>
                        <input
                            type="text"
                            placeholder="Título"
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Descrição da tarefa"
                        />
                        <div className="button-content">
                            <button onClick={handleAddTodo}>Salvar</button>
                            <button onClick={() =>setShowAddForm(false)}>Fechar</button> 
                        </div>
                    </div>
                </div>

            )}

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.edit ? (
                            <div className="card">
                                <input
                                    type="text"
                                    name="title"
                                    value={todo.title}
                                    onChange={(e) => handleEditTodo(todo, e)}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={todo.description}
                                    onChange={(e) => handleEditTodo(todo, e)}
                                />
                                <div className='checkbox'>
                                    <h3>Tarefa Completa?</h3>
                                    <input
                                        type="checkbox"
                                        name="completed"
                                        checked={todo.completed}
                                        onChange={(e) => handleEditTodo(todo, e)}
                                    />
                                </div>
                                <button onClick={() => handleSaveEdit(todo)}>Save</button>
                                <button onClick={() => handleCancelEdit()}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                {todo.title} {todo.description}
                                <input
                                    type="checkbox"
                                    name="completed"
                                    checked={todo.completed}
                                    readOnly
                                />
                                <button onClick={() => handleEditClick(todo)}>Edit</button>
                                <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Home;
