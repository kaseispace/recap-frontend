export const MOCK_EMPTY_UUID = 'empty-data-uuid-0000' // 空のデータが返されるときに使用

export const MOCK_UUID = 'data-uuid-1111' // データが返されるときに使用

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const MOCK_STUDENT_AUTH_USER = {
  delete: vi.fn(),
  displayName: null,
  email: 'mockstudent@example.com',
  emailVerified: false,
  getIdToken: vi.fn(() => Promise.resolve('mocked-student-idToken')),
  getIdTokenResult: vi.fn(),
  isAnonymous: false,
  metadata: {},
  phoneNumber: null,
  photoURL: null,
  providerData: [
    {
      providerId: 'password',
      uid: 'mockstudentr@example.com',
      displayName: null,
      email: 'mockstudent@example.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  providerId: 'firebase',
  refreshToken: 'refresh-token',
  reload: vi.fn(),
  tenantId: 'tenant-id',
  toJSON: vi.fn(),
  uid: 'h9I0j1K2l3M4n5O6p7Q8r9S0t1U2'
}

export const MOCK_TEACHER_AUTH_USER = {
  delete: vi.fn(),
  displayName: null,
  email: 'mockteacher@example.com',
  emailVerified: false,
  getIdToken: vi.fn(() => Promise.resolve('mocked-teacher-idToken')),
  getIdTokenResult: vi.fn(),
  isAnonymous: false,
  metadata: {},
  phoneNumber: null,
  photoURL: null,
  providerData: [
    {
      providerId: 'password',
      uid: 'mockteacher@example.com',
      displayName: null,
      email: 'mockteacher@example.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  providerId: 'firebase',
  refreshToken: 'refresh-token',
  reload: vi.fn(),
  tenantId: 'tenant-id',
  toJSON: vi.fn(),
  uid: 'a1B2c3D4e5F6g7H8i9J0k1L2m3N4'
}

export const MOCK_EMAIL_AUTH_CREDENTIAL = {
  providerId: 'password',
  signInMethod: 'password',
  _email: 'mockstudent@example.com',
  _password: 'password',
  _tenantId: null
}
