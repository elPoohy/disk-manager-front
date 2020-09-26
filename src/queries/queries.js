import gql from 'graphql-tag'

export const ALL_TENANTS_GQL = gql`
    query{
        Tenants{
            name,
            id,
            primaryGroup,
            officeGroup,
            organization,
            order,
            users{
                id,
                displayName,
                email
            },
            status
        }
    }
`

export const ALL_USERS_GQL = gql`
    query{
        Users{
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
    }
`

export const CURRENT_USER_GQL = gql `
    query {
        User{
            fullAdmin,
            tenantAdmin,
            displayName
        }
    }
`

