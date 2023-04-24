/* eslint-disable import/prefer-default-export */
import { ofetch } from 'ofetch';

export const fetchApi = ofetch.create({
  baseURL: process.env.baseURL,
});
