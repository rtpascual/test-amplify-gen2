import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { testFunction } from './function/test-function/resource.js';

defineBackend({
  auth,
  data,
  testFunction,
});
