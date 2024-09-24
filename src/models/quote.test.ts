import Quote from './quote';

let quote: Quote;

beforeEach(() => {
    quote = new Quote();
});

test('should initialize with default values', () => {
    expect(quote.coverFor).toBe('');
    expect(quote.coverAmount).toBe('');
    expect(quote.title).toBe('');
    expect(quote.firstName).toBe('');
    expect(quote.surname).toBe('');
    expect(quote.phoneNumber).toBe('');
    expect(quote.emailAddress).toBe('');
    expect(quote.keepUpdated).toBe(false);
});

test('should initialize with provided values', () => {
    const customQuote = new Quote(
        'Family',
        '50000',
        'Mr',
        'John',
        'Doe',
        '1234567890',
        'john.doe@example.com',
        true
    );

    expect(customQuote.coverFor).toBe('Family');
    expect(customQuote.coverAmount).toBe('50000');
    expect(customQuote.title).toBe('Mr');
    expect(customQuote.firstName).toBe('John');
    expect(customQuote.surname).toBe('Doe');
    expect(customQuote.phoneNumber).toBe('1234567890');
    expect(customQuote.emailAddress).toBe('john.doe@example.com');
    expect(customQuote.keepUpdated).toBe(true);
});

test('should return the correct name using getName()', () => {
    quote.setName({title: 'Ms', firstName: 'Jane', surname: 'Smith'});
    const name = quote.getName();

    expect(name).toEqual({
        title: 'Ms',
        firstName: 'Jane',
        surname: 'Smith',
    });
});

test('should return the correct coverFor using getCoverFor()', () => {
    quote.setCoverFor('Family');
    expect(quote.getCoverFor()).toBe('Family');
});

test('should return the correct coverAmount using getCoverAmount()', () => {
    quote.setCoverAmount('100000');
    expect(quote.getCoverAmount()).toBe('100000');
});

test('should return the correct contact details using getContactDetails()', () => {
    quote.setContactDetails({
        phoneNumber: '1234567890',
        emailAddress: 'jane.smith@example.com',
        keepUpdated: true,
    });

    const contactDetails = quote.getContactDetails();
    expect(contactDetails).toEqual({
        phoneNumber: '1234567890',
        emailAddress: 'jane.smith@example.com',
        keepUpdated: true,
    });
});

test('should update coverFor using setCoverFor()', () => {
    quote.setCoverFor('Life');
    expect(quote.coverFor).toBe('Life');
});

test('should update coverAmount using setCoverAmount()', () => {
    quote.setCoverAmount('50000');
    expect(quote.coverAmount).toBe('50000');
});

test('should update name using setName()', () => {
    quote.setName({title: 'Mr', firstName: 'John', surname: 'Doe'});
    expect(quote.title).toBe('Mr');
    expect(quote.firstName).toBe('John');
    expect(quote.surname).toBe('Doe');
});

test('should update contact details using setContactDetails()', () => {
    quote.setContactDetails({
        phoneNumber: '9876543210',
        emailAddress: 'john.doe@example.com',
        keepUpdated: false,
    });

    expect(quote.phoneNumber).toBe('9876543210');
    expect(quote.emailAddress).toBe('john.doe@example.com');
});