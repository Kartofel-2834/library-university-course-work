// Types
import type { ValidatorBuilder } from "@/types/composables";

// Constants
import { ValidatorsMessages } from "@/assets/ts/constants/validators-messages";

// Libs
import moment from "moment";

export function useValidators<T = unknown>(): Record<string, ValidatorBuilder<T>> {
    return {
        REQUIRED: (msg = ValidatorsMessages.required) => {
            return v => v ? null : msg;
        },

        DATE_VALID: (msg = ValidatorsMessages.incorrect) => {
            return v =>  {
                const isValid = (
                    (moment.isMoment(v) || typeof v === 'string') &&
                    moment(v).isValid()
                );

                return isValid ? null : msg;
            };
        },

        DATE_RANGE: (
            msg = ValidatorsMessages.dateRange,
            fields
        ) => {
            return (_, values) => {
                if (!fields) {
                    throw new Error('[useValidators/DATE_RANGE]: from, to fields names missing');
                }

                const from = values?.[fields?.[0]];
                const to = values?.[fields?.[1]];

                if (!from || !to || !(from instanceof Date) || !(to instanceof Date)) {
                    return null;
                }

                return from.getTime() < to.getTime() ? null : msg;
            };        
        }
    };
}