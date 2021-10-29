import React from 'react';
import './index.css';
import CloseBtn from './assets/images/close-btn.svg';
import UserItems from './Components/UserItems.js';

const arr = [
	{
		id: 1,
		avatarUrl: 'https://source.unsplash.com/50x50/?people&1',
		fullName: 'Gowa Gowa',
		email: 'gowagowa@mail.com',
	},
	{
		id: 2,
		avatarUrl: 'https://source.unsplash.com/50x50/?people&2',
		fullName: 'Naran Naran',
		email: 'NaranNaran@mail.com',
	},
	{
		id: 3,
		avatarUrl: 'https://source.unsplash.com/50x50/?people&3',
		fullName: 'Ara Ara',
		email: 'AraAra@mail.com',
	},
];

function App() {
	const [users, setUsers] = React.useState(arr);
	const [valueInput, setValueInput] = React.useState('');
	const [list, setList] = React.useState([]);

	function handleChangeInput(e) {
		const { value } = e.target;
		setValueInput(value);
	}

	function clearSearchInput() {
		setValueInput('');
	}

	function addUsers(id) {
		if (list.find((obj) => obj.id === id)) {
			setList(list.filter((o) => o.id !== id))
		} else {
			setList([...list, { id }]);
		}
	}

	return (
		<div className='container'>
			<div className='box'>
				<h3 className='title'>Рассылка приглашений</h3>
				<form action='#'>
					<div className='search'>
						<label className='search__label'>
							<input
								value={valueInput}
								onChange={handleChangeInput}
								className='search__user search__input'
								type='text'
								placeholder='Найти пользователя'
							/>
							{valueInput && (
								<img
									onClick={clearSearchInput}
									className='search__icon-close'
									src={CloseBtn}
									alt='Закрыть'
								/>
							)}
						</label>
					</div>

					<div className='users'>
						{users
							.filter((obj) =>
								obj.fullName.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()),
							)
							.map((obj) => (
								<UserItems {...obj} onAdd={addUsers} isAdded={list.find((o) => o.id === obj.id)} />
							))}
					</div>

					<div className='form__btn'>
						<button className='form__btn-cancel'>Отмена</button>
						<button className='form__btn-submit' type='submit'>
							Отправить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
