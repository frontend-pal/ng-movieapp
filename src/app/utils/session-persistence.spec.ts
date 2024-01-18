import { sessionPersistence } from "./session-persistence";

describe('sessionPersistence', () => {
  beforeEach(() => {
    // Reset sessionStorage before each test
    sessionStorage.clear();
  });

  it('should delete a value', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    const sessionSpy = spyOn(sessionStorage, 'removeItem');

    sessionPersistence.set(key, value);

    // test the method
    sessionPersistence.delete(key);
    expect(sessionSpy).toHaveBeenCalledWith(key);
  });

  it('should deleteAll values', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    const sessionSpy = spyOn(sessionStorage, 'removeItem');
    sessionPersistence.set(key, value);
    
    // get session keys
    const keys = Object.keys(sessionStorage);
    
    sessionPersistence.deleteAll();
    expect(sessionSpy).toHaveBeenCalledTimes(keys.length);
  });

  it('should delete an Array of key values', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    const sessionSpy = spyOn(sessionStorage, 'removeItem');
    const keyNames = ['testKey'];

    sessionPersistence.set(key, value);

    // call function
    sessionPersistence.deleteArray(keyNames);
    expect(sessionSpy).toHaveBeenCalledTimes(keyNames.length);
  });

  it('should set a RawString value', () => {
    const key = 'testKey';
    const value = '{ data: "testData" }';
    const sessionSpy = spyOn(sessionStorage, 'setItem');

    sessionPersistence.setRawString(key, value);
    expect(sessionSpy).toHaveBeenCalled();
  });
});
