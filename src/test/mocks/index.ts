export const emptyDataUUID = 'empty-data-uuid-0000' // 空のデータが返されるときに使用
export const dataUUID = 'data-uuid-1111' // データが返されるときに使用
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export const mockAuthUser = {
  delete: vi.fn(),
  displayName: null,
  email: 'mockuser@example.com',
  emailVerified: false,
  getIdToken: vi.fn(() => Promise.resolve('mocked-idToken')),
  getIdTokenResult: vi.fn(),
  isAnonymous: false,
  metadata: {},
  phoneNumber: null,
  photoURL: null,
  providerData: [
    {
      providerId: 'password',
      uid: 'mockuser@example.com',
      displayName: null,
      email: 'mockuser@example.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  providerId: 'firebase',
  refreshToken: 'refresh-token',
  reload: vi.fn(),
  tenantId: 'tenant-id',
  toJSON: vi.fn(),
  uid: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4'
}
