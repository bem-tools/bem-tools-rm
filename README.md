# bem-tools-remove
BEM tools plugin for removing BEM entity files

[![NPM version](http://img.shields.io/npm/v/bem-tools-rm.svg?style=flat)](http://www.npmjs.org/package/bem-tools-rm)
[![Build Status](https://travis-ci.org/bem-incubator/bem-tools-rm.svg)](https://travis-ci.org/bem-incubator/bem-tools-rm)
[![David](https://img.shields.io/david/bem-incubator/bem-tools-rm.svg)](https://david-dm.org/bem-incubator/bem-tools-rm)

![Logo](./logo.png)

Инструмент для удаления БЭМ сущностей по заданным критериям.

## Возможности

* Использование в качестве плагина к [bem-tools](https://github.com/bem/bem-tools)
* Возможность использования с помощью JS API

## Установка

Инструмент устанавливается как обычная npm-зависимость:
```
$ npm install bem-tools-rm
```

## Использование

### Использование с помощью CLI-интерфейса.

```
$ ./bin/bem rm --help
Tools to work with files written using the BEM methodology.
See https://bem.info for more info.

BEM Tool for removing BEM entity files

Usage:
  bem rm [OPTIONS] [ARGS]

Commands:
  completion : Shell completion

Options:
  -h, --help : Help
  -l LEVEL, --level=LEVEL : Name of level(s)
  -b BLOCK, --block=BLOCK : Name of block(s)
  -e ELEMENT, --element=ELEMENT : Name of element(s)
  -m MODIFIER, --mod=MODIFIER : Name of modifier(s)
  -t TECH, --tech=TECH : Name of tech(s)

Arguments:
  ENTITY : entity
```

Здесь:

* `-h`, `--help` - флаг предназначенный для получения справочной информации по вызову команды.
* `-l`, `--level` - имя уровня(ей) переопределения блоков. Может быть использован несколько раз.
* `-b`, `--block` - имя блока(ов). Может быть использован несколько раз.
* `-e`, `--element` - имя элемента(ов) блока(ов). Может быть использован несколько раз.
* `-m`, `--mod` - имя модификатора. Если указан также параметр элемента (`-e`, `--element`), 
то подразумевается выборка по модификаторам элементов блока. Если параметр элемента отсутствует, то
будет произведена выборка по модификаторам блока.
* `-t`, `--tech` - имя технологии блока.

### Использование инструмента с помощью JS API.

`bem-tools-rm` также может быть использован программно. Для этого нужно подключить зависимость
`bem-tools-rm` в модуль вашего проекта и передать переметры для поиска BEM-сущностей которые должны быть удалены.
```
var bemToolsRemove = require('bem-tools-rm');

bemToolsRemove({
    levels: ['level1'],
    blocks: ['block1', 'block2'],
    elements: ['elem1', 'elem2'],
    modifiers: ['mod1', 'mod2'],
    techs: ['tech1', 'tech2']
}).pipe(process.stdout) //здесь вместо `process.stdout` можно использовать ваш собственный stream.
```

Примечание: в передаваемом объекте с параметрами любые поля могут быть опущены в том случае если
критерий поиска по ним не является необходимым.

## Тестирование

Запуск тестов
```
$ npm test
```

Запуск тестов с вычислением покрытия кода тестами с помощью инструмента [istanbul](https://www.npmjs.com/package/istanbul):
```
$ npm run cover
```

Проверка синтаксиса кода с помощью:
[jshint](https://www.npmjs.com/package/jshint),
[jscs](https://www.npmjs.com/package/jscs)

```
$ npm run lint
```

Особая благодарность за помощь в разработке:

* [Гриненко Владимир](http://github.com/tadatuta)
* [Харисов Виталий](https://github.com/vithar)

Разработчики: 
* [Кузнецов Андрей](https://github.com/tormozz48)

Вопросы и предложения присылать в раздел [issues](https://github.com/bem-incubator/bem-tools-rm) репозитория данного инструмента.
