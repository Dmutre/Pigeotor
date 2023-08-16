# Pigiotor
 My own copy of twitter. In this project my target is to use typescript, express.js, handlebar and postgreSQL in one app. I gonna copy functional, design from twitter to show my skills.


Ці записи для мене:
Я вирішив зберігати інформацію про користувача (ід і т. п.) у токені і з нього діставати потрібні дані.
Далі мені потрібно переробити базу даних користувачів, щоб потрібні поля були унікальними і додати таблицю статусів користувачів(їх роль на сайті). Адмін, звичайний юзер, гість, модератор, автор і т. п.
Далі треба доробити роут для профілю, змінити типи у параметрах функцій. Там де в мене реквест і респонс
має бути дакі типи, а в мене ені. Почистити код в цілому і продовжити роботу над авторизацією

Що треба зробити: 
1. Додати цифровий відбиток до рефреш токену. Тобто дані заліза користувача при його авторизації
2. Перенести ацес токен з хттп онлі куків у клаєнт меморі, щоб він був короткоживучим і стирався, коли
користувач закривав вкладку
3. Завдяки цифровому відбидку користувача можна довіритися автоматичному оновленню рефреш токенів, щоб користувачу не треба було постійно кожні 2-3 дні авторизовуватися. Зробити перевірку, якщо це те саме залізо і той самий користувач, то рефреш токен сам по собі оновлюється. Але зробити так, щоб ці токени 
автоматично оновлювались лише один раз. Якщо вони це роблять у другий раз, то потрібно найладати заборону
на ці два токени, бо один з них міг отримати злочинець