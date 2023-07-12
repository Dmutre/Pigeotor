"use strict";

const createUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe',
      }),
    });

    if (!response.ok) {
      throw new Error('Помилка при створенні користувача');
    }

    const data = await response.json();
    console.log(data); // Дані, які повернув сервер після створення користувача
  } catch (error) {
    console.error('Помилка:', error.message);
  }
};

createUser();