export const mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/list-manager',
};

export const server = {
  port: process.env.SERVICE_PORT || '3000',
};

export const financialRules = {
  dueDateToAcceptAdjustment: Number(process.env.DUE_DATE_TO_ACCEPT_ADJUSTMENT) || 3,
};
