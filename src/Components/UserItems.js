import React from 'react';

const UserItems = ({id, avatarUrl, fullName, email, onAdd, isAdded}) => {
	return (
		<div key={id} className='users__box'>
			<div className='users__left'>
				<img src={avatarUrl} alt='Пользователь' />
				<div className='users__inner'>
					<h4 className='users__name'>{fullName}</h4>
					<p className='users__subtext'>{email}</p>
				</div>
			</div>
			<div className='users__right'>
				<button onClick={() => onAdd(id)} type='button' className={`close-btn ${isAdded ? 'pushed': ''}`}></button>
			</div>
		</div>
	);
};

export default UserItems
