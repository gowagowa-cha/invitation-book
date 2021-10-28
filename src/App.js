import React from 'react';
import './index.css';
import CloseBtn from './assets/images/close-btn.svg';

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

	function handleChangeInput(e) {
		const { value } = e.target;
		setValueInput(value);
	}

	function clear() {
		setValueInput('')
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
							{valueInput && <img onClick={clear} className='search__icon-close' src={CloseBtn} alt='Закрыть' />}
						</label>
					</div>

					<div className='users'>
						{users
							.filter((obj) =>
								obj.fullName.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()),
							)
							.map((obj) => (
								<div key={obj.id} className='users__box'>
									<div className='users__left'>
										<img src={obj.avatarUrl} alt='Пользователь' />
										<div className='users__inner'>
											<h4 className='users__name'>{obj.fullName}</h4>
											<p className='users__subtext'>{obj.email}</p>
										</div>
									</div>
									<div className='users__right'>
										<button type='button' className='close-btn'></button>
									</div>
								</div>
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
