<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
  setup () {
    const { result, loading, error } = useQuery(gql`
      query Users{
            id,
            email,
            displayName,
            quota,
            free,
            tenantAdmin,
            fullAdmin,
            office,
            tenant{
                organization,
                name,
                id
            }
        }
    `, null, {
      errorPolicy: 'all',
    })

    return {
      result,
      loading,
      error,
    }
  },
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2>Good: {{ result.goodField }}</h2>
    <pre>Bad:
      <span v-for="(error, i) of error.graphQLErrors" :key="i">
        {{ error.message }}
      </span>
    </pre>
  </div>
</template>
