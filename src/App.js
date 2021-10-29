import React from 'react';
import './index.css';
import CloseBtn from './assets/images/close-btn.svg';
import UserItems from './Components/UserItems.js';
import skeletonPng from './assets/images/skeleton.png';
import { Success } from './Components/Success';

function App() {
	const [users, setUsers] = React.useState([]);
	const [valueInput, setValueInput] = React.useState('');
	const [list, setList] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [submited, setSubmited] = React.useState(false);

	function handleChangeInput(e) {
		const { value } = e.target;
		setValueInput(value);
	}

	function clearSearchInput() {
		setValueInput('');
	}

	function addUsers(id) {
		if (list.find((obj) => obj.id === id)) {
			setList(list.filter((o) => o.id !== id));
		} else {
			setList([...list, { id }]);
		}
	}

	const  sendListRequest = async() => {
		await fetch('http://localhost:3001/list', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(list),
		});
		setSubmited(true);
	}

	function onHandleClickedSubmit() {
		if(list.length) {
			sendListRequest();
		} else {
			alert("Список пуст")
		}
	}

	function onCloseSubmit() {
		setSubmited(false);
	}

	React.useEffect(() => {
		fetch('http://localhost:3001/people')
			.then((res) => res.json())
			.then((json) => setUsers(json));
		setLoading(false);
	}, []);

	if (submited) {
		return (
			<div className='container'>
				<div className='box'>
					<Success onClose={onCloseSubmit} />
				</div>
			</div>
		);
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
						{loading ? (
							<img src={skeletonPng} alt='skeleton' />
						) : (
							users
								.filter((obj) =>
									obj.fullName.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()),
								)
								.map((obj) => (
									<UserItems
										{...obj}
										onAdd={addUsers}
										isAdded={list.find((o) => o.id === obj.id)}
									/>
								))
						)}
					</div>

					<div className='form__btn'>
						<button className='form__btn-cancel'>Отмена</button>
						<button onClick={onHandleClickedSubmit} className='form__btn-submit' type='submit'>
							Отправить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
