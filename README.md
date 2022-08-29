# ToDo App

![todo-app](https://user-images.githubusercontent.com/74612362/187177678-586683e0-b8ce-4a0f-b297-097fc80295d5.png)

Приложение для ведения списков задач и их организации по проектам на чистом JS с разделением логики и UI.
- CRUD-операции для проектов и задач
- Работа с данными и представление вынесены в отдельные модули ProjectsList (model) и UI (view).
  Обработка событий в модуле Events (controller).  
- Приложение адаптируется под размер экрана. Сайдбар сворачивается и вручную, оставляя всю ширину для списка задач, и автоматически на небольших экранах. 
- Данные хранятся в localStorage

### Further development
- drag & drop для реорганизации задач
- привязка задачи к определенной дате и времени
- возможность добавить задаче дополнительные детали и теги
