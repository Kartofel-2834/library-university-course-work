// Types
import type { IBook } from "@/types/entities";

// Enums
import { EBookStatus } from "@/enums/entities";

// Libs
import moment from "moment";

export const books: IBook[] = [
    {
        id: 1,
        name: 'Война и мир',
        author: 'Лев Николаевич Толстой',
        status: EBookStatus.AVAILABLE,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/T25-011.jpg',
        description: '«Война и мир» – роман-эпопея великого русского писателя Льва Николаевича Толстого, одно из высших достижений его художественного гения.',
        details: 'УВ 44 Б',
        receiptDate: moment('2024-08-01'),
        publicationDate: moment('1873-01-01'),
        issueDate: null,
        reader: null,
    },

    {
        id: 2,
        name: 'Детство. Отрочество. Юность',
        author: 'Лев Николаевич Толстой',
        status: EBookStatus.AVAILABLE,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nJSJGL0MOTGefkIyA772ujyJ4C7pNAze2g&s',
        description: 'Лев Николаевич Толстой (1828–1910) – великий русский писатель, философ и мыслитель, большое внимание уделял теме детства, взросления и формирования характера.\nЕго автобиографическая трилогия «Детство. Отрочество. Юность» повествует о становлении личности ребенка, проблемах самоопределения и установления взаимоотношений с внешним миром.',
        details: 'УВ 52 Б',
        receiptDate: moment('2024-08-01'),
        publicationDate: moment('1857-01-01'),
        issueDate: null,
        reader: null,
    },

    {
        id: 3,
        name: 'Братья Карамазовы',
        author: 'Федор Михайлович Достоевский',
        status: EBookStatus.AVAILABLE,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUqdcNGu66oG8gqJaZa3PROZDJUbCMJcp0w&s',
        description: '"Братья Карамазовы" (1880 г.) – последний роман Достоевского, вершина его творчества, в каком-то смысле главный труд всей его жизни и одно из величайших произведений в истории мировой литературы. Загадка, связанная со смертью и кражей, полная накала и страстей любовная история, разворачивающаяся на глазах читателя семейная драма, сложные психологические перипетии, множество вплетенных в основную канву других остросюжетных линий – все это вместилось в роман «Братья Карамазовы», главной проблематикой которого является вопрос о Боге и бессмертии души. А в центре повествования, как всегда у Достоевского, – человек, терзаемый сомнениями, раздираемый страстями, жаждущий любви, власти, денег, мечущийся от добра ко злу и от зла к добру, ищущий свой путь, свою веру, своего Бога. Роман лег в основу десятков экранизаций – отечественных и зарубежных – и все время становится предметом режиссерских экспериментов. Но, наверное, правы те, кто считает, что ни одна, даже самая талантливая, постановка не в силах передать всей глубины этой прозы.',
        details: 'УВ 121 Б',
        receiptDate: moment('2024-06-01'),
        publicationDate: moment('1880-01-01'),
        issueDate: null,
        reader: null,
    },

    {
        id: 4,
        name: 'Преступление и наказание',
        author: 'Федор Михайлович Достоевский',
        status: EBookStatus.AVAILABLE,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkhC0b1rae0gadYaSYZOJ8qtgoGwPCVILXIw&s',
        description: '«Преступление и наказание» – гениальный роман, главные темы которого: преступление и наказание, жертвенность и любовь, свобода и гордость человека – обрамлены почти детективным сюжетом. Многократно экранизированный и не раз поставленный на сцене, он и по сей день читается на одном дыхании.',
        details: 'УВ 55 Б',
        receiptDate: moment('2024-07-15'),
        publicationDate: moment('1866-01-01'),
        issueDate: null,
        reader: null,
    },

    {
        id: 6,
        name: 'Игрок',
        author: 'Федор Михайлович Достоевский',
        status: EBookStatus.REQUESTED,
        imageUrl: 'https://imo10.labirint.ru/books/583886/cover.jpg/242-0',
        description: 'История азарта, ставшего для человека уже не смыслом игры и даже не смыслом жизни, но единственной, экзистенциальной сутью бытия. Сюжет разворачивается в немецком курортном городке с вымышленным названием Рулетенбург. Главный герой — Алексей Иванович — путешествует с семьёй отставного генерала в качестве учителя его детей. Все в семье ждут смерти бабушки, чтобы получить огромное наследство. Алексей влюблён в Полину, падчерицу генерала. Сама же девушка влюблена во француза, маркиза де Грие. Тем временем бабушка приезжает в городок совершенно здоровая, увлекается игрой в рулетку и проигрывает часть своего состояния. Алексей пытается помочь Полине, выигрывая для неё огромную сумму денег, но гордая девушка не принимает их. Все герои повествования на какое-то время теряют друг друга из виду, Алексей сам становится игроком на рулетке, а через два года узнаёт, что на самом деле всё это время Полина действительно любила его.',
        details: 'УВ 66 Б',
        receiptDate: moment('2022-07-15'),
        publicationDate: moment('1866-01-01'),
        issueDate: null,
        reader: null,
    },
];

export const availableBooks: IBook[] = books.filter(book => book.status === EBookStatus.AVAILABLE); 

export const occupiedBooks: IBook[] = books.filter(book => book.status === EBookStatus.OCCUPIED); 

export const requestedBooks: IBook[] = books.filter(book => book.status === EBookStatus.REQUESTED); 

export const waitingBooks: IBook[] = books.filter(book => book.status === EBookStatus.WAITING); 
