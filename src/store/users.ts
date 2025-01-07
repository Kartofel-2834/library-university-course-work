// Types
import type { IAdmin, IReader, IUser } from '@/types/entities';

// Enums
import { EUserType } from '@/enums/entities/EUserType';

// Constants
import { admins as $admins, readers as $readers } from '@/mock/users';

// Vue
import { ref, computed } from 'vue';
import $router from '@/plugins/router';

// Store
import { defineStore } from 'pinia';
import { EAppPages } from '@/enums/plugins/EAppPages';

export const useUsersStore = defineStore('users', () => {
    const target = ref<IUser | null>($admins[0]);

    const isAdmin = computed<boolean>(() => Boolean(target.value?.type === EUserType.ADMIN));
    const isReader = computed<boolean>(() => Boolean(target.value?.type === EUserType.READER));

    const admins = ref<IAdmin[]>([...$admins]);
    const readers = ref<IReader[]>([...$readers]);

    const users = computed<IUser[]>(() => [...admins.value, ...readers.value]);

    function setUser(user: IUser) {
        target.value = user;
    }

    function logout() {
        if (!target.value) {
            return;
        }

        target.value = null;
        $router.push({ name: EAppPages.LOGIN });
    }

    function deleteReader(reader: IReader) {
        if (reader.type !== EUserType.READER) {
            throw new Error('Только читателей можно удалить из базы читателей');
        }

        readers.value = readers.value.filter(v => v.id !== reader.id);
    }

    function addReader(reader: IReader) {
        if (reader.type !== EUserType.READER) {
            throw new Error('Только читателей можно добавлять в базу читателей');
        }

        const sameStudentId = readers.value.find(v => v.studentId === reader.studentId);
        
        if (sameStudentId) {
            throw new Error('Читатель с таким номером студ. билета уже есть в базе');
        }
        
        const sameLogin = readers.value.find(v => v.login === reader.login);

        if (sameLogin) {
            throw new Error('Читатель с таким логином уже есть в базе');
        }

        readers.value = [
            ...readers.value.filter(v => v.id !== reader.id),
            reader
        ];
    }

    return {
        target,
        users,
        admins,
        readers,
        isAdmin,
        isReader,

        setUser,
        logout,
        deleteReader,
        addReader
    };
});