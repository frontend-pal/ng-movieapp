import { MockKeyboardEvent, createMockKeyboardEvent } from "./mock-data.mock";

describe('createMockKeyboardEvent', () => {
  let mockEvent: MockKeyboardEvent;

  beforeEach(() => {
    mockEvent = createMockKeyboardEvent('a', 'KeyA', 'TestValue');
  });

  it('should create a mock keyboard event with the specified key, code, and value', () => {
    spyOn(document, 'createEvent');

    expect(mockEvent.key).toBe('a');
    expect(mockEvent.code).toBe('KeyA');
    expect(mockEvent.target.value).toBe('TestValue');
    expect(document.createEvent).toHaveBeenCalled();
  });

  it('should have the correct event type', () => {
    expect(mockEvent.type).toBe('keydown');
  });

  it('should have the correct properties from the Event interface', () => {
    // Add expectations for other properties from the Event interface if needed
    expect(mockEvent.defaultPrevented).toBeFalsy();
  });
});
