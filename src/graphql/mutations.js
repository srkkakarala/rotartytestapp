/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUploadHistory = /* GraphQL */ `
  mutation CreateUploadHistory(
    $input: CreateUploadHistoryInput!
    $condition: ModelUploadHistoryConditionInput
  ) {
    createUploadHistory(input: $input, condition: $condition) {
      id
      username
      filename
      status
      filekey
      recordscount
      createdAt
      updatedAt
    }
  }
`;
export const updateUploadHistory = /* GraphQL */ `
  mutation UpdateUploadHistory(
    $input: UpdateUploadHistoryInput!
    $condition: ModelUploadHistoryConditionInput
  ) {
    updateUploadHistory(input: $input, condition: $condition) {
      id
      username
      filename
      status
      filekey
      recordscount
      createdAt
      updatedAt
    }
  }
`;
export const deleteUploadHistory = /* GraphQL */ `
  mutation DeleteUploadHistory(
    $input: DeleteUploadHistoryInput!
    $condition: ModelUploadHistoryConditionInput
  ) {
    deleteUploadHistory(input: $input, condition: $condition) {
      id
      username
      filename
      status
      filekey
      recordscount
      createdAt
      updatedAt
    }
  }
`;
