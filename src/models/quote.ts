interface Name {
    title: string;
    firstName: string;
    surname: string;
}

interface ContactDetails {
    phoneNumber: string;
    emailAddress: string;
    keepUpdated: boolean;
}

class Quote {
    coverFor: string;
    coverAmount: string;
    title: string;
    firstName: string;
    surname: string;
    phoneNumber: string;
    emailAddress: string;
    keepUpdated: boolean;

    constructor(
        coverFor: string = '',
        coverAmount: string = '',
        title: string = '',
        firstName: string = '',
        surname: string = '',
        phoneNumber: string = '',
        emailAddress: string = '',
        keepUpdated: boolean = false
    ) {
        this.coverFor = coverFor;
        this.coverAmount = coverAmount;
        this.title = title;
        this.firstName = firstName;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.keepUpdated = keepUpdated;
    }

    getName(): Name {
        return {title: this.title, firstName: this.firstName, surname: this.surname};
    }

    getCoverFor(): string {
        return this.coverFor
    }

    getCoverAmount(): string {
        return this.coverAmount
    }

    getContactDetails(): ContactDetails {
        return {phoneNumber: this.phoneNumber, emailAddress: this.emailAddress, keepUpdated: this.keepUpdated}
    }

    setCoverFor(coverFor: string) {
        this.coverFor = coverFor
    }

    setCoverAmount(coverAmount: string) {
        this.coverAmount = coverAmount
    }

    setName(name: Name) {
        this.title = name.title
        this.firstName = name.firstName
        this.surname = name.surname
    }

    setContactDetails(contactDetails: ContactDetails) {
        this.phoneNumber = contactDetails.phoneNumber
        this.emailAddress = contactDetails.emailAddress
        this.keepUpdated = contactDetails.keepUpdated
    }

}

export default Quote