import { element, by } from 'protractor';
import { complaintListPage } from './complaint-list.po';

export const complaintEditPage = {
  navigateTo: async () => {
    await complaintListPage.navigateTo();
    await complaintListPage.getAddComplaintButton().click();
  },

  getNameInput: () => element(by.name('name')),

  getEmailInput: () => element(by.name('email')),

  getPhoneNumberInput: () => element(by.name('phoneNumber')),

  getSubjectInput: () => element(by.name('subject')),

  getContentInput: () => element(by.name('content')),

  getImageUrlInput: () => element(by.name('imageSource')),

  getSubmitButton: () => element(by.id('submit'))
};
