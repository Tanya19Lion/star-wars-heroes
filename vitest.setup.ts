import '@testing-library/jest-dom';

import { vi } from 'vitest';

// mock global fetch so tests don’t call real APIs
vi.stubGlobal('fetch', vi.fn(() => Promise.reject('Fetch not mocked!')));

