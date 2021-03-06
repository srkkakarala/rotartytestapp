/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUploadHistory = /* GraphQL */ `
  query GetUploadHistory($id: ID!) {
    getUploadHistory(id: $id) {
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
export const listUploadHistories = /* GraphQL */ `
  query ListUploadHistories(
    $filter: ModelUploadHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUploadHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        filename
        status
        filekey
        recordscount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
