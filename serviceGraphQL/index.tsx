import { GraphQLClient } from "graphql-request";

export const myFetcher = async (query: any) => {
    const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
    const graphQLClient = new GraphQLClient(baseUrl);
    try {
        const data = await graphQLClient.request(query);
        return data;
    } catch (e) {
        console.log(e);
        return e
    }
};


export const mutationApi = async (
    query: string,
    variables: any,
) => {
    const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
    const graphQLClient = new GraphQLClient(baseUrl);
    try {
        const data = await graphQLClient.request(query, variables);
        return data;
    } catch (e) {
        console.log(e);
        return e
    }
};
