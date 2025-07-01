import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

const gqlQuery = `query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}`;

const gqlVariables = {
  name: 'pikachu',
};

class NetworkError extends Error {
  name = 'NetworkError';
}

export default function GraphQL() {

  const fetchGraphQL = useCallback(async () => {
    return fetch('https://graphql-pokeapi.graphcdn.app/', {
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: gqlQuery,
        variables: gqlVariables,
      }),
      method: 'POST',
    })
      .then((res) => res.json())
      .catch((res) => new NetworkError('Response from server', {cause: res.message}));
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["https://graphql-pokeapi.graphcdn.app/"],
    queryFn: fetchGraphQL,
    enabled: true,
  });

  return (
    <div className="m-auto max-w-screen-lg">
      <h1 className="text-2xl mt-4">GraphQL Test Area</h1>
      {isLoading ? <div>Loading...</div> : null}
      {error ? <div>Error: {error.toString()}</div> : null}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
    </div>
  )
}


