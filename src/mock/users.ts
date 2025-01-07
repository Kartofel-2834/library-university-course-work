// Types
import type { IAdmin, IReader, IUser } from "@/types/entities";

// Enums
import { EUserType } from "@/enums/entities/EUserType";

export const admins: IAdmin[] = [
    {
        id: 4,
        login: 'superuser',
        password: '123456',
        type: EUserType.ADMIN
    }
];

export const readers: IReader[] = [
    {
        id: 1,
        login: 'radjab-gabibov',
        password: '123456',
        type: EUserType.READER,
        name: 'Раджаб',
        surname: 'Габибов',
        fathername: 'Маратович',
        studentId: 6920
    },

    {
        id: 2,
        login: 'mammaev-tazhutin',
        password: '88888888',
        type: EUserType.READER,
        name: 'Тажутин',
        surname: 'Маммаев',
        fathername: 'Магомед-Багович',
        studentId: 8888
    },

    {
        id: 3,
        login: 'zainukova-ilmu',
        password: '7777777',
        type: EUserType.READER,
        name: 'Ильмухаят',
        surname: 'Зайнукова',
        fathername: 'Арслановна',
        studentId: 7777
    }
];

export const users: IUser[] = [
    ...admins,
    ...readers,
];