import { defineFunction, secret } from "@aws-amplify/backend"

export const testFunction = defineFunction({
    environment: {
        TEST: 'test',
        AMPLIFY_SECRET: secret('amplifySecret'),
        SHARED_SECRET: secret('sharedSecret'),
    }
})