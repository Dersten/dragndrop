const tasksListElement = document.querySelector('.tasks_list');
const taskElements = tasksListElement.querySelectorAll('.tasks__item');

// Перебираем все элементы списка и присваиваем нужное значение
for(const task of taskElements) {
  task.draggable = true;
}

//Добавим реакцию на начало и конец перетаскивания
tasksListElement.addEventListener('dragstart', (evt) => {
  evt.target.classList.add('selected');
})

tasksListElement.addEventListener('dragend', (evt) => {
  evt.target.classList.remove('selected');
})

//Реализуем логику перетаскивания:
//1. Делаем всю область списка доступной для сброса.
//2. Находим выбранный элемент .selected и тот элемент, на котором сработало событие dragover.
//3. Проверяем, что событие dragover сработало не на выбранном элементе, потому что иначе перемещать элемент нет смысла — он уже на нужном месте.
//4. Также проверяем, что dragover сработало именно на одном из элементов списка. Это важно, потому что курсор может оказаться и на пустом пространстве между элементами, а оно нас не интересует.
//5. Находим элемент, перед которым нужно осуществить вставку. Сделаем это, сравнив положение выбранного элемента и текущего, на который наведён курсор.
//6. Вставляем выбранный элемент на новое место.

tasksListElement.addEventListener('dragover', (evt) => {
  // Разрешаем сбрасывать элементы в эту область
  evt.preventDefault();

  // Находим перемещаемый элемент
  const. activeElement = tasksListElement.querySelector('.selected');
  // Находим элемент, над которым в данный момент находится курсор
  const currentElement = evt.target;
  // Проверяем, что событие сработало:
  // 1. не на том элементе, который мы перемещаем,
  // 2. именно на элементе списка
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);

  // Если нет, прерываем выполнение функции
  if(!isMoveable) {
    return;
  }

  // Находим элемент, перед которым будем вставлять
  // Для поиска nextElement мы использовали тернарный оператор
  const nextElement = (currentElement === activeElement.nextElementSibling) ?
    currentElement.nextElementSibling :
    currentElement;

  // Вставляем activeElement перед nextElement
  tasksListElement.insertBefore(activeElement, nextElement);
});
