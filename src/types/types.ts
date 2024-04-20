export type Item = {
  __typename: string,
  node: {
    __typename: string,
    assignees: {
      totalCount: number,
      __typename: string,
    },
    author: {
      login: string,
      url: string,
      __typename: string,
    },
    body: string,
    authorAssociation: string,
    createdAt: Date,
    id: string,
    number: number,
    state: string,
    title: string,
    url: string,
  }
}