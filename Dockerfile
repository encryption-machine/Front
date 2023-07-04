# инструкция: откуда берем базовый образ - node, версия alpine - содержит в себе npm
FROM node:alpine
# инструкция: рабочей директории внутри образа
WORKDIR /app
# инструкция: на каком порту в контейнере будет работать приложение
EXPOSE 3000
# инструкция: по копированию package.json и package-lock.json, а также указываем в какую папку копируем (./)
COPY package*.json ./
# инструкция: устанавливаем все небходимые зависимости
RUN npm install
# инструкция: копируем все оставшиеся файлы в текущую папку
COPY . .
# инструкиця: по сборке проекта
RUN npm run build
# инструкция: по копированию файла
CMD cp -r build result_build


# альтернативная запись после последней записи COPY (взамен последнему RUN и CMD)
# CMD ["npm", "run", "build"]